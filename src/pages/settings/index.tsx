/*
 * @file: Settings
 * @author: lc
 * @description: 用来展示和修改全局 Model 数据使用方式的界面
 */

import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { Button } from 'antd';
import { Card } from 'antd';


const Settings = ({ globalModel, history }: any) => {
    // 定义 val，让 input 成为受控组件
    const [val, setVal] = useState('');
    /**
     * input 值发生变化时触发该方法
     */
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
    };
    /**
     * 按钮点击时触发该方法
     */
    const handleClick = () => {
        const { changeUserName } = globalModel;
        if (val) {
            changeUserName(val);
            setVal('');
        }
    };

    const { username } = globalModel;
    const title = "Settings 界面：展示以及修改全局 Model 中的属性";
    const actions = [<Button key="0" onClick={() => history.goBack()}>返回</Button>];

    return (
        <Card title={title} actions={actions} style={{ width: 600 }}>
            <div style={{ marginBottom: 30 }}>
                <input placeholder="输入新的 username 值" value={val} onChange={handleValueChange} />
                <Button style={{ marginLeft: 20 }} type="primary" onClick={handleClick}>修改 username </Button>
            </div>
            <span>可以获取到 GlobalModel 中的 username:
                <span style={{ marginLeft: 20, background: 'pink', padding: '4px 16px' }}>{username}</span>
            </span>
        </Card>
    );
};
export default inject('globalModel')(Settings);