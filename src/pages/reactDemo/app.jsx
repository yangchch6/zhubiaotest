/**
 * 整个应用的入口，包含路由，数据管理加载
 */

import React, { Component } from "react";
import ReactDom from 'react-dom';
import 'core-js/es6/map';
import 'core-js/es6/set';
import DemoContainer from './container.js';
import "src/app.less";

ReactDom.render(
    <DemoContainer/>,
    document.getElementById('app')
)