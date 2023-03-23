package main

import (
	"encoding/json"
	"fmt"
	"go/db"
	"go/notify"
	"go/utils"
	"net/http"

	"github.com/gorilla/mux"
)

func setRouterHeader(router *mux.Router) {
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			next.ServeHTTP(w, r)
		})
	})
}

func uploadLogHandler(w http.ResponseWriter, r *http.Request) {
	var data map[string]interface{}
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&data)

	jsonStr, err := json.Marshal(data["content"])

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	defer db.WriteLog(jsonStr)

	defer notify.FeiShu(string(jsonStr))

	w.Write([]byte(`{"code": 0, "msg": "success"}`))
}

func getLogHandler(w http.ResponseWriter, r *http.Request) {

	query := r.URL.Query()

	fileName := query.Get("fileName")

	if fileName != "" {
		str := db.ReadLogFile(fileName)
		w.Write([]byte(utils.ResultSuccess(str)))
		return
	}

	files := db.ReadAllLogFile()

	filesStr, err := json.Marshal(files)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	w.Write([]byte(utils.ResultSuccess(string(filesStr))))
}

func main() {
	router := mux.NewRouter()
	setRouterHeader(router)

	apiRouter := router.PathPrefix("/api").Subrouter()

	// 上传日志
	apiRouter.HandleFunc("/upload/log", uploadLogHandler).Methods("POST")

	// 获取日志
	apiRouter.HandleFunc("/upload/log", getLogHandler).Methods("GET")

	fmt.Println("Server is running on port http://localhost:9999")

	http.ListenAndServe(":9999", router)
}
