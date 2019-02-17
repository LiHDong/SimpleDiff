const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    const devMode = env === "loc";
    return {
        entry: [
            "@babel/polyfill",
            "./test/element.test.js"
        ],
        output: {
            filename: "[name].[hash].js",
            path: path.resolve(__dirname, "dist")
        },
        mode: devMode ? "development" : "production",
        devtool: devMode ? "inline-source-map" : "",
        module: {
            rules: [
                {
                    test:/\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["env", {"useBuiltIns": "entry"}]
                                ],
                                plugins: [
                                    "transform-decorators-legacy",
                                    "transform-runtime",
                                    "transform-class-properties",
                                    "transform-object-rest-spread",
                                ]
                            }
                        }
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: "./test/element.test.html"
            })
        ]
    }
};