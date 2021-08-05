const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    {
        entry: "./src/ui/index.tsx",
        target: 'electron-renderer',
        output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
        mode: process.env.NODE_ENV || "development",
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        devServer: { contentBase: path.join(__dirname, "src", "ui") },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
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
                    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                    use: ["file-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "ui", "index.html"),
            }),
        ],
    },
    {
        entry: "./src/main.ts",
        target: 'electron-main',
        output: { path: path.join(__dirname, "build"), filename: "main.bundle.js" },
        mode: process.env.NODE_ENV || "development",
        resolve: {
            extensions: [".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"],
                }
            ],
        }
    },
];