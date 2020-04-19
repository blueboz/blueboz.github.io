
import React, { Component } from 'react'

import {Link} from "react-router-dom";
import styles from './main.less'
import {Button} from "antd";

export default class Main extends Component {
    render() {
        return (
            <div>
                <h1>欢迎光临~~</h1>
                <span>欢迎查看最新的文章</span>
                <div className={styles.item}>
                    <h3>Groovy 语言文档v3.0.3</h3>
                    <Link to="/blog/groovy/references/Groovy 语言文档v3.0.3.md">
                        <Button type="primary">Go</Button>
                    </Link>
                </div>
                <div className={styles.item}>
                    <h3>idea 2020.01 激活方法</h3>
                    <Link to="/blog/others/references/idea 2020.01 激活方法.md">
                        <Button type="primary">Go</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

