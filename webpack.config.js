var path = require('path');


module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve('frontend/js'),
    entry: './app.ts',
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js',
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
        contentBase: 'frontend/public',
        port: 5000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        }
    }
}