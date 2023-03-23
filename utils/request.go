package utils

func ResultSuccess(jsonStr string) string {
	return `{"code": 0, "msg": "success", "data": ` + jsonStr + `}`
}
