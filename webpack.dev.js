const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/ui/index.tsx",
    target: 'web',
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            fs: false,
            path: false
        },
    },
    devServer: { contentBase: path.join(__dirname, "src", "ui") },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3)$/,
                use: ["file-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "ui", "index.html"),
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify("DEV"),
            VERSION: JSON.stringify(packageConfig.version),
        })
    ],
};