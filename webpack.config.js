const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 8001,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};