import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ErrorBoundary, Loading } from "@/components";
// 使用 CSS Module 的方式引入 App.less
import styles from "./App.less";
// Home 组件
const Home = lazy(() => import("@/pages/home/index"));
// Settings 组件
const Settings = lazy(() => import("@/pages/settings/index"));
// Display 组件
const Display = lazy(() => import("@/pages/display/index"));
// Display 组件
// const Video = lazy(() => import("@/pages/video"));
// Demo 组件
const Demo = lazy(() => import("@/pages/demo/index"));
// NotFound 组件
const NotFound = lazy(() => import("@/pages/exception/index"));

export default ({ history }: any) => {
    return (
        <div className={styles['app']}>
            <ErrorBoundary>
                <Router history={history}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/demo" component={Demo} />
                            {/* <Route path="/video" component={Video} /> */}
                            <Route path="/settings" component={Settings} />
                            <Route path="/display" component={Display} />
                            <Route exact path="/" component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </Router>
            </ErrorBoundary>
        </div>
    );
};
