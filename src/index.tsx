import React from "react";
import ReactDom from "react-dom";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import globalModel from "./GlobalModel";
import history from 'utils/history';
import App from "./App";

history.listen((location, action) => {
    if (action === 'PUSH') {
        window.scroll(0, 0);
    }
});
ReactDom.render(
    // 使用 Provider 将 globalModel 传递给包裹住的所有组件及子组件
    <LocaleProvider locale={zh_CN}>
        <Provider globalModel={globalModel}>
            <App history={history} />
        </Provider>
    </LocaleProvider>
    ,
    document.querySelector("#root")
);
