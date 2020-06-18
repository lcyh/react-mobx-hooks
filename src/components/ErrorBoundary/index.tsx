import React from "react";
import { Result, Button } from "antd";

const ErrorBoundaryAutoReload = "ErrorBoundaryAutoReload";

export interface ErrorBoundaryProps {
    [propName: string]: any;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    [propName: string]: any;
}
class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
    > {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    handleRefresh = () => {
        window.location.reload();
    };

    render() {
        //线上环境这里设置 process.env.NODE_ENV==='production'
        if (this.state.hasError && process.env.NODE_ENV === "development") {
            // const autoReload = sessionStorage.getItem(ErrorBoundaryAutoReload);
            // if (!autoReload) {
            //     sessionStorage.setItem(ErrorBoundaryAutoReload, "true");
            //     this.handleRefresh();
            //     return;
            // }
            return (
                <Result
                    status="500"
                    title="未知错误"
                    subTitle="点击下方按钮，刷新一下，试试？"
                    extra={
                        <Button type="primary" onClick={this.handleRefresh}>
                            刷新
                        </Button>
                    }
                />
            );
        }
        sessionStorage.removeItem(ErrorBoundaryAutoReload);
        return this.props.children;
    }
}
export default ErrorBoundary;
