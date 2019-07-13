const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        /*contentBase:'../dist',*/
        overlay: {
            errors: true
        }
        /*,
        historyApiFallback: {
            index: '/index.html'
        }*/
    }
});