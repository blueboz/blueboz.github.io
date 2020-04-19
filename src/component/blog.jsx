import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from "@/codeBlock";

export default class blog extends Component {
    constructor(props){
        super(props)
        this.state={
            article:''
        }
    }
    componentWillMount(){
        fetch("/dist/"+this.props.match.params.art_name)
            .then(res=>res.text())
            .then(res=>{
                res=res.replace("./","/dist/");
                this.setState({article:res})
            })
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
