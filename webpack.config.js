var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve('frontend/src'),
    entry: './app.ts',
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets',
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
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    devServer: {
        contentBase: 'frontend/src',
        port: 5000
    }
}