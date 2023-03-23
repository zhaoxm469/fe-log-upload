package db

import (
	"fmt"
	"os"
	"path"
	"time"
)

func WriteLog(log []byte) {
	currentDate := time.Now().Format("2006-01-02 15:04:05")
	logPath := path.Join("./logs", currentDate+".log")
	err := os.WriteFile(logPath, log, 0666)
	if err != nil {
		fmt.Println(err)
	}
}

func ReadAllLogFile() ResultList {

	result := ResultList{}

	customFile := []CustomFile{}

	dir, err := os.ReadDir("./logs")
	if err != nil {
		fmt.Println(err)
	}

	result.Total = len(dir)

	for _, file := range dir {
		customFile = append(customFile, CustomFile{
			Name:  file.Name(),
			IsDir: file.IsDir(),
		})
	}

	result.List = customFile

	return result
}

func ReadLogFile(fileName string) string {
	str, err := os.ReadFile(`./logs/` + fileName + ``)
	if err != nil {
		fmt.Println(err)
	}
	return string(str)
}
