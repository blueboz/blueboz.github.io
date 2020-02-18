const path=require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')//导入内存中自动生成index页面的插件

const htmlPlugin=new HtmlWebPackPlugin({
    template:path.join(__dirname,'./src/index.html'),
    filename:'index.html'
})
module.exports={
    mode:"development",
    plugins:[
        htmlPlugin
    ],
    output: {
      path: path.resolve(__dirname, ''),
      filename: 'bundle.js'
    },
    module:{
        rules:[
            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json' ] ,//表示这几个文件的后缀名会自动补全
        alias:{
            '@':path.join(__dirname,'./src')//这样@符号就表示项目根目录中src的这一层路径
        }
    }
}