package db

type CustomFile struct {
	Name  string `json:"name"`
	IsDir bool   `json:"isDir"`
}

type ResultList struct {
	Total int          `json:"total"`
	List  []CustomFile `json:"list"`
}
