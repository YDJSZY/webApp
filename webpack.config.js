/**
 * Created by luwenwei on 16/12/6.
 */
var path = require('path');
var webpack = require('webpack');
var plugins = require("./plugins");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry:{
        app:path.resolve(__dirname, './public/app.js'),
        plugins_css:plugins.css,
        plugins_js:plugins.js,
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, 'output/'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    /*resolve: {
        extensions: ['', '.js', '.vue']
    },*/
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0'],
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('plugins_js', 'plugins_js.js'),
        new ExtractTextPlugin('plugins_css','plugins_css.css'),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: 'public/views/index.html'
        })
    ]
}