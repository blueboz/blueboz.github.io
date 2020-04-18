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
            <div>
                <h3>博客--{this.props.match.params.type}--{this.props.match.params.article}</h3>
                <ReactMarkdown source={this.state.article}></ReactMarkdown>
            </div>
        )
    }
}
