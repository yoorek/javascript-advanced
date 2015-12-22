
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './tests/index.ts',
        'webpack-dev-server/client?http://localhost:3000'
    ],
    output: {
        publicPath: '/',
        filename: 'bundle.js'
    },
    debug: true,
    devtool: 'source-map',
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'common/components')
        },
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    devServer: {
        contentBase: "./"
    }
};