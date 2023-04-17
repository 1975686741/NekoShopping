import axios from "axios";
import baseURL from "./baseUrl";
import { showLoadingToast } from "vant";
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000
});

// toast 单例模式
let toast = null;

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.method.toLowerCase() === "get") {
      config.params = config.data;
    }
    // 展示加载进度条
    toast = showLoadingToast("加载中", { duration: 0 });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    toast.close();
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
