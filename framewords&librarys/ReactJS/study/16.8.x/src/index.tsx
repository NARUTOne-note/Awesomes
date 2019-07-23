import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// 引入路由配置模块
import RouterList from './router';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import {LocaleProvider, message} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './style/index.scss';

// antd 全局配置
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

const mountNode = document.getElementById('app'); // 设置要挂在的点

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <RouterList />
  </LocaleProvider>
, mountNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
