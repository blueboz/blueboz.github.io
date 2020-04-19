import React from 'react'
import ReactDOM from  'react-dom'
import {HashRouter,Route,Link} from  'react-router-dom'
import App from './App';
// 全局声明svg component定义
ReactDOM.render(<HashRouter><App></App></HashRouter> ,document.getElementById("app"));