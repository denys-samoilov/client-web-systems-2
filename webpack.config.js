// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from "node:path";
import { fileURLToPath } from "node:url";
import "webpack-dev-server";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

import HtmlWebpackPlugin from "html-webpack-plugin"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

/** @type {import("webpack").Configuration} */
const config  = {
    // The page itself is the entry: webpack bundles the scripts and stylesheets
    // it references and emits it as `dist/index.html`.
    entry: { index: "./src/app.ts" },
    output: {
        filename: "output.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 9000,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./index.html",
    })
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // HTML, CSS and TypeScript need no loader — webpack supports them out of the box
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

export default () => {
    if (isProduction) {
        config.mode = "production";
        config.plugins?.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = "development";
    }
    return config;
};
