const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'js')
    },
    module: {
        rules: [
            {
                // test: /\.js$/,
                // test: /\.m?js$/,
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    
                        options: {
                            babelrc: true,
                        }
                    }
                ],
            },
        ]
    },
    mode: process.env.NODE_ENV,
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        port: 9090,
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true, 
    },
};