const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const extractSass = new ExtractTextWebpackPlugin({
    filename: "lib/[name].css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'lib/image_edit.js',
        library:'ImageEdit',
        libraryTarget:'umd',
        libraryExport: 'default',
    },
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        hot:true,
        overlay: true,//编译出错的时候，在浏览器页面上显示错误
        open:true,
        port:4000,
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'demo'),
            to:path.resolve(__dirname, 'dist')
        }]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./demo/index.html'),
            filename: 'index.html'
        }),
        extractSass,
        // new webpack.ProvidePlugin({
        //     $:'jQuery'
        // })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }

            },
            {
                test:/\.scss$/,
                use: extractSass.extract({
                    use: [
                        //'style-loader',//将 JS 字符串生成为 style 节点
                        'css-loader',//将 CSS 转化成 CommonJS 模块
                        'sass-loader', //将 Sass 编译成 CSS
                    ],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            }
        ]
    },
    // externals:{
    //     jquery: 'jquery'
    // }
}