const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        stickyElement: './src/',
    },
    output: {
        path: path.join(__dirname, "../example/"),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ],
    },

    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
};