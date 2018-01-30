const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        stickyElement: './src/',
    },
    output: {
        path: path.join(__dirname, "../example/"),
        filename: '[name].js',
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
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
    ],
};