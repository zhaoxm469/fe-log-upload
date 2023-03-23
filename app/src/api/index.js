import axios from "axios";

axios.defaults.baseURL = "http://localhost:9999/api";

axios.interceptors.request.use(
  config => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data.data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem("token");
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath }
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);


export const post =(url, data) => {
  return axios.post(url, data);
}

export const get =(url, data) => {
  return axios.get(url, data);
}