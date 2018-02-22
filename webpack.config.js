var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve('frontend'),
    entry: './src/app.ts',
    output: {
        path: path.resolve('build/'),
        publicPath: "/build/",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx', '.html']
    },
    stats: {
        colors: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: "/node_modules/"
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: "/node_modules/"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: 'build',
        port: 5000
    }
}