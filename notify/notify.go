package notify

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func FeiShu(contentText string) {

	url := "https://open.feishu.cn/open-apis/bot/v2/hook/4327e8a3-e70d-45b6-9fa6-d0593926026e"

	jsonStream := map[string]interface{}{
		"msg_type": "text",
		"content": map[string]interface{}{
			"text": contentText,
		},
	}

	dataStr, err := json.Marshal(jsonStream)

	if err != nil {
		fmt.Println(err)
	}

	payload := bytes.NewReader(dataStr)

	req, err := http.NewRequest("POST", url, payload)

	if err != nil {
		fmt.Println(err)
	}

	req.Header.Add("content-type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(body))
}
