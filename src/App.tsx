import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

// 使用 CSS Module 的方式引入 App.less
import styles from "./App.less";

// Loading 提示
const loadingComponent = () => <span>Loading</span>;

// Home 组件
const Home = Loadable({
    loader: () => import("@/pages/home"),
    loading: loadingComponent,
});

// Settings 组件
const Settings = Loadable({
    loader: () => import("@/pages/settings"),
    loading: loadingComponent,
});

// Display 组件
const Display = Loadable({
    loader: () => import("@/pages/display"),
    loading: loadingComponent,
});
// Display 组件
const Video = Loadable({
    loader: () => import("@/pages/video"),
    loading: loadingComponent,
});
// Demo 组件
const Demo = Loadable({
    loader: () => import("@/pages/demo"),
    loading: loadingComponent,
});
// NotFound 组件
const NotFound = Loadable({
    loader: () => import("@/pages/exception"),
    loading: loadingComponent,
});

export default () => {
    return (
        <div className={styles.app}>
            <Switch>
                <Route path="/video" component={Video} />
                <Route path="/demo" component={Demo} />
                <Route path="/settings" component={Settings} />
                <Route path="/display" component={Display} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
