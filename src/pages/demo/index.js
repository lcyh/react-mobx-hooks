import React, { Component } from "react";
import styles from "./index.less";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
