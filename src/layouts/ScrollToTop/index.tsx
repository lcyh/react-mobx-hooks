import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface IScrollToTopProps extends RouteComponentProps {}

class ScrollToTop extends PureComponent<IScrollToTopProps, {}> {
    componentDidUpdate(prevProps: IScrollToTopProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            //  TODO：调整页面布局，改用 window.scroll() 方法，适用于整个项目
            const contentLayout = document.querySelector("#content-layout");
            if (contentLayout) {
                contentLayout.scroll(0, 0);
            }
        }
    }
    render() {
        const { children } = this.props;
        return children;
    }
}

export default withRouter(ScrollToTop);
