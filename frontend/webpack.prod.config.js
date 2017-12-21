const path = require('path');
const fs  = require('fs');
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/antd-vars.less'), 'utf8'));

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: './index.tsx',
    output: {
        filename: 'hotloader.js',
        // the output bundle
        path: resolve(__dirname, 'dist'), 
        libraryTarget: "umd",
        library: "Hotloader",
    },
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [            
            { 
                test: /\.(ts|tsx)?$/, 
                use: [
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
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({template: resolve(__dirname, 'src/index.html')}),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          })
    ],
};