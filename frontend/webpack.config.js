const path = require('path');
const fs  = require('fs');
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/antd-vars.less'), 'utf8'));
console.log(themeVariables);

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:8081',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.tsx'
        // the entry point of our app
    ],
    output: {
        filename: 'hotloader.js',
        // the output bundle
        path: resolve(__dirname, 'dist'), 
        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        hot: true,
        // enable HMR on the server
        noInfo: true,
        quiet: false,
        // minimize the output to terminal.
        contentBase: resolve(__dirname, 'src'),
        // match the output path
        publicPath: '/',
        // match the output `publicPath`
        port: 8081,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8082'
            }
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",                
                test: /\.(ts|tsx)?$/, 
                loader: 'tslint-loader',
                exclude: [resolve(__dirname, "node_modules")],
            },             
            { 
                test: /\.(ts|tsx)?$/, 
                use: [
                    {loader: 'react-hot-loader/webpack'}, 
                    {loader: 'babel-loader'},
                    {loader: 'awesome-typescript-loader'}, 
                ] 
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader!less-loader" },
            { 
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: themeVariables
                        }
                    },
                ]
            },
            { test: /\.(png|jp(e*)g|svg)$/, loader: "url-loader?limit=1024" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({template: resolve(__dirname, 'src/index.html')}),
        // inject <script> in html file. 
        new OpenBrowserPlugin({url: 'http://localhost:8081'}),
    ],
};