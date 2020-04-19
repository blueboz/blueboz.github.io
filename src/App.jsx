import React, { Component } from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Link } from 'react-router-dom'
import blog from './component/blog'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './App.less'
import { GroovyIcon, JavaIcon,CIcon,PythonIcon,OthersIcon } from './component/icocomp/CustomIcons';
import Main from './component/main';


export default class App extends Component {
  state = {
    collapsed: true,
    data: {
      defaultOpenKeys:[],
      defaultSelectedKeys:[],
      datas: [
        {
          key: "groovy", techType: 'Groovy', items: [
            { name: 'Groovy 语言文档v3.0.3', link: "/blog/groovy/references/Groovy 语言文档v3.0.3.md", key: "11" }
          ]
        },
        { key: "java", techType: 'Java', items: [] },
        { key: "c", techType: 'C', items: [] },
        { key: "python", techType: 'Python', items: [] },
        { key: "others", techType: '其他', items: [
            { name: 'idea 2020.01 激活方法.md', link: "/blog/groovy/references/idea 2020.01 激活方法.md", key: "51" }
        ] }
      ]
    }
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  renderSubMenu = () => {
    return this.state.data.datas.map(item => {
      return <SubMenu key={item.key} title={
        <span>
          {
            ((type)=>{

              if(type=="Java"){
                return <JavaIcon></JavaIcon>
              }else if(type=="C"){
                return <CIcon></CIcon>
              }else if(type=="Groovy"){
                return <GroovyIcon></GroovyIcon>
              }else if(type=="Python"){
                return <PythonIcon></PythonIcon>
              }else{
                return <OthersIcon></OthersIcon>
              }
            })(item.techType)
          }
          <span>{item.techType}</span>
        </span>
      } >
        {
          item.items.map((it) => {
            return <Menu.Item key={it.key}>
              <Link to={it.link}>
                {it.name}
              </Link>
            </Menu.Item>
          })

        }
      </SubMenu>
    })
  }
  render() {
    return (
      <Layout style={{height:'100%',overflow:"hidden"}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Link to="/">
            <div className={styles.logo} >

              <div className={styles.logoimg}></div>
            </div>
          </Link>
          <Menu theme="dark" defaultOpenKeys={this.state.data.defaultOpenKeys} defaultSelectedKeys={this.state.data.defaultSelectedKeys} mode="inline">
            {
              this.renderSubMenu()
            }
          </Menu>


        </Sider>
        <Layout >
          <Header  style={{ paddingLeft: 25, color: 'white', fontSize: 'large' }} >
            尾田的博客小栈
          </Header>
          <Content style={{ margin: '0 16px'}}>
              <div style={{overflowY:'scroll',height:'100%',background:'white',margin:'20px',padding:'15px'}}>
                <Route exact path="/" component={Main}></Route>
                <Route exact path="/blog/:type/:article/:art_name" component={blog}></Route>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>博客栈 ©2020 Created by blueboz</Footer>
        </Layout>
      </Layout>
    )
  }
}
