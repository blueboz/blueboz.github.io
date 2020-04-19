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
            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/},
            { test: /\.less$/, use: [ 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules:true
                }
            },
            'less-loader' ] },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', {
                        loader: 'css-loader',
                        options: {
                            //支持@important引入css
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                                    require('postcss-import')(),
                                    require("autoprefixer")({
                                        "browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
                                    })
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json' ] ,//表示这几个文件的后缀名会自动补全
        alias:{
            '@':path.join(__dirname,'./src')//这样@符号就表示项目根目录中src的这一层路径
        }
    }
}