import axios from "axios";
import auth from "./auth";
import history from "./history";

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    appId: auth.appId,
    token: auth.token,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.status === 200 && response.data) {
      let result = response.data;
      //  将服务端返回的 message 赋值给 errorMsg，这样可以避免和 antd 的 message 组件重名
      //   result.errorMsg = result.message;
      if (result.code === 0) {
        //  如果 code = 0 则请求成功
        return result;
      } else if (result.code === "100001") {
        // 登录失败
        sysLoginOut();
        return Promise.reject("登录失效");
      } else {
        // message.error(result.message || "未知错误~");
        // return Promise.reject(result);
        //  其他错误，原样返回，由开发者处理
        return result;
      }
    } else {
      return response;
      // return Promise.reject(
      //     new Error("请求好像出了点问题，要不刷新一下？")
      // );
    }
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const sysLoginOut = () => {
  //  清除保存的信息
  // window.localStorage.removeItem("__USER_ACCOUNT__");
  // window.location.href = "/api/backendUser/account/loginOut";
  history.replace("/no-permission");
};

export default instance;

export const { get, delete: del, post, put, patch } = instance;
