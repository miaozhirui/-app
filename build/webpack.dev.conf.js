var path = require('path');
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devtool: '#eval-source-map',
    plugins: [
        
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({

            filename: 'index.html',
            pageList: utils.generatePageList(),
            template: path.join(__dirname, '../src/pages/zcommon/index.ejs'),
            inject: false,
            chunksSortMode: 'dependency'
        }),
       
    ]
})

module.exports = webpackConfig;