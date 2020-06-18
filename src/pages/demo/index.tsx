import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "./index";

interface IDemoProps extends RouteComponentProps {
}
interface IDemoState {
    count: number
}
export default class Demo extends Component<IDemoProps, IDemoState> {
    constructor(props: IDemoProps) {
        super(props);
        this.state = {
            count: 0
        };
    }
    componentDidMount() {
        // console.log("script start");
        // setTimeout(function () {
        //   console.log("setTimeout");
        // }, 0);

        // Promise.resolve()
        //   .then(function () {
        //     console.log("promise1");
        //   })
        //   .then(function () {
        //     console.log("promise2");
        //   });
        // console.log("script end");
        setInterval(function () {
            console.log("setInterval");
        }, 3000);
        setTimeout(function () {
            console.log("setTimeout");
        }, 2000);
    }

    render() {
        return (
            <div className={styles["demo-wrapper"]}>
                <h1>浏览器进程、JS事件循环机制、宏任务和微任务</h1>
            </div>
        );
    }
}
