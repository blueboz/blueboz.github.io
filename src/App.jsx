import React, { Component } from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Route,Link} from  'react-router-dom'
import blog from './component/blog'
import generic from './component/generic'
import info from './component/info'
import others from './component/others'
import statics from './component/statics'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './App.less'

export default class App extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className={styles.logo} />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link to="/statics">
                    <PieChartOutlined />
                    <span>
                      统计
                    </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/generic">
                  <DesktopOutlined />
                  <span>
                      概览
                  </span>
                      </Link>
                </Menu.Item>
                <SubMenu
              key="sub1"
              title={
                <span>
                    <UserOutlined />
                    <span>
                      个人中心
                     </span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to={"info"}>
                  Blueboz
                </Link>
              </Menu.Item>

            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <TeamOutlined />
                  <span>
                    博客
                      </span>
                </span>
              }
            >
              <Menu.Item key="6">
                <Link to="/blog/cpp">
                  c++
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/blog/java">
                  java
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Link to="/others">
              <FileOutlined />
              <span>
                  其他
              </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Route path="/statics" component={statics}></Route>
              <Route path="/generic" component={generic}></Route>
              <Route path="/info" component={info}></Route>
              <Route path="/blog" component={blog}></Route>
              <Route path="/others" component={others}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>My Website ©2020 Created by blueboz</Footer>
        </Layout>
      </Layout>
    )
  }
}
