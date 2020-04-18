import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'


export default class blog extends Component {
    constructor(props){
        super(props)
        this.state={
            article:''
        }

    }
    componentWillMount(){
        fetch("/dist/Groovy 语言文档v3.0.3.md")
            .then(res=>res.text())
            .then(res=>{
                console.log("read")
                this.setState({article:res})
            })
    }
    render() {
        return (
            <ReactMarkdown style={{height:133,overflowY:'scroll'}} source={this.state.article}
            renderers={{"java":<div style={{width:'10px',height:'10px',background:'red'}}></div>}}
    ></ReactMarkdown>
        )
    }
}
