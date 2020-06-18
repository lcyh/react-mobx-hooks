import React from "react";
import { Spin } from "antd";
import styles from "./index.less";
export interface LoadingProps {
    [propName: string]: any;
}
export interface LoadingState {
    loading: boolean;
    [propName: string]: any;
}
class Loading extends React.Component<LoadingProps, LoadingState> {
    private timerId: any;
    constructor(props: any) {
        super(props);
        this.state = { loading: false };
        this.timerId = null;
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({ loading: true });
        }, 200);
    }
    componentWillUnmount() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <div className={styles["loading-page"]}>
                    <Spin tip="Loading..."></Spin>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default Loading;
