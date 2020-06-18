/*
 * @file: NotFound
 * @author: lc
 * @description: 路由不匹配时错误信息展示界面
 */

import React from "react";
import { Button } from "antd";

const Expection = ({ history }: any) => {
    return (
        <div>
            <h2>404</h2>
            <Button type="primary" onClick={() => history.replace("/")}>
                返回首页
      </Button>
        </div>
    );
};
export default Expection;
