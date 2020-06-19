"use strict";
// 请求头有时可能会根据环境变量传入不同的 headers
// 外网 IP ，欺瞒服务端 ip 验证
const XForwardedFor = "123.234.123.234";
const headers = {
  "X-Forwarded-For": XForwardedFor,
};

const proxys = {
  dev: {
    "/api": {
      changeOrigin: true,
      target: "https://easy-mock.com/mock/5c2dc9665cfaa5209116fa40/example",
      pathRewrite: {
        "^/api/": "/",
      },
      headers,
    },
  },
  qa: {
    "/api/": {
      changeOrigin: true,
      target: "http://123.234.123.234",
      //请求头headers 可能用于后端重定向
      headers: {
        Host: "fx-manager.qa.hths.com",
      },
      pathRewrite: {
        "^/api/": "",
      },
    },
  },
  online: {
    "/api/": {
      changeOrigin: true,
      target: "http://123.234.123.234:80",
      headers: {
        Host: "fx-manager.hths.com",
      },
    },
    "/financeApi": {
      changeOrigin: true,
      target: "http://saas.fin-purzz.com/ ",
      pathRewrite: {
        "^/financeApi/": "/finance/",
      },
    },
  },
  mock: {},
};
// 默认proxy是dev
let proxy = proxys.dev;
let API_ENV = process.env.API_ENV;
console.log("API_ENV", API_ENV);
for (const key in proxys) {
  if (process.env[`${API_ENV}`]) {
    proxy = { ...proxy, ...proxys[key] };
  }
}
module.exports = proxy;
