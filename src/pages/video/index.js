import React, { Component } from "react";
import {
  Player,
  BigPlayButton,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl, // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton, // 倍速播放选项
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import styles from "./index.module.less";

export default class PlayerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerSource:
        "https://c-dev.weimobwmc.com/qa-saas-wxbiz/e13af76d2c56455f830358adb0c8ed60.mp4",
      count: 0,
    };
  }
  componentDidMount() {
    // 监听原生事件
    document
      .querySelector(".test")
      .addEventListener("click", this.changeValue, false);
    // console.log(this.player)
    // this.setState({count:this.state.count+1});
    // console.log('生命周期componentDidMount-this.state.count',this.state.count);
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.playerSource !== prevState.playerSource) {
      this.player.load();
    }
  }
  //   handleStateChange(state, prevState) {
  //     // console.log(state)
  //   }
  //   合成事件
  handleClick = () => {
    console.log("script start");
    setTimeout(function () {
      console.log("setTimeout");
    }, 0);
    Promise.resolve();

    console.log("合成事件点击之前-this.state.count", this.state.count);
    //   this.setState({count:this.state.count+1});
    //   console.log('合成事件点击之后-this.state.count',this.state.count);
    this.handleSetTime();
  };
  //   定时器
  handleSetTime = () => {
    setTimeout(() => {
      console.log("定时器事件里面之前-this.state.count", this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log("定时器事件里面之后-this.state.count", this.state.count);
    }, 3000);
  };
  // 原生事件
  changeValue = () => {
    console.log("原生事件里面之前-this.state.count", this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log("原生事件里面之后-this.state.count", this.state.count);
  };
  render() {
    const { playerSource, count } = this.state;
    return (
      <div className={styles["video-wrapper"]}>
        <div
          className="test"
          style={{
            width: "100px",
            height: "20px",
            background: "green",
            padding: "20px",
            margin: "20px",
          }}
        >
          原生事件监听
        </div>
        <div
          onClick={this.handleClick}
          style={{
            width: "100px",
            height: "20px",
            background: "red",
            padding: "20px",
            margin: "20px",
          }}
        >
          合成事件
        </div>
        <h2>点击增加count is:{count}</h2>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
          loop={false}
          poster="https://video-react.js.org/assets/poster.png"
        >
          <BigPlayButton position="center" />
          <source src={playerSource} type="video/mp4" />
          <ControlBar autoHide={false} disableDefaultControls={false}>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <PlayToggle />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
            <VolumeMenuButton />
          </ControlBar>
        </Player>
      </div>
    );
  }
}
