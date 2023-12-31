module.exports = {
    mode: "development",
    watch: true,
    entry: "./sqLearn.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.tsx?$/, loader: "babel-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: `fileLoader`,
                    options: {
                        name: "images/[name].[hash].[ext]", // Настройте путь и имя для сохранения изображений
                    },
                },
            },
        ],
    },
};
