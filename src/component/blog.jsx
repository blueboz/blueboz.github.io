import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from "@/codeBlock";

export default class blog extends Component {
    constructor(props){
        //哈希值如果变化的时候，需要重新刷新页面
        super(props)
        this.state={
            article:''
        }
        //注册哈希值的变化
        window.onhashchange = this.hashChanged;
    }
    hashChanged=()=>{
        this.loadData();
    }
    componentWillReceiveProps(nextProps){

    }
    loadData=()=>{
        fetch("/dist/"+this.props.match.params.art_name)
            .then(res=>res.text())
            .then(res=>{
                //只替换图片相关的URL
                var arrs=res.match(/!\[.*\]\((.*)\)/g);
                if(arrs!=null){
                    arrs.forEach(item=>{
                        res=res.replace(item,item.replace(/\.\//g,'/dist/'));
                    })
                }
                this.setState({article:res})
            })
    }
    componentWillMount(){
        this.loadData();
    }
    render() {
        return (
            <ReactMarkdown style={{height:133,overflowY:'scroll'}} source={this.state.article}
                           renderers={{
                               code: CodeBlock,
                           }}
    ></ReactMarkdown>
        )
    }
}
