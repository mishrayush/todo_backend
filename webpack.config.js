const path = require("path"); // Node.js path module
const nodeExternals = require("webpack-node-externals"); // Exclude node_modules
const webpack = require("webpack"); // Webpack core module
const fs = require("fs");
const dotenv = require("dotenv");

// Check if we are in production mode
const isProduction = process.env.NODE_ENV === "production";

// Load correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    console.warn(`⚠️ Environment file ${envFile} not found!`);
}

module.exports = {
    entry: {
        app: "./src/app.js", // The main file where Webpack starts bundling
    },

    target: "node", // Specifies that the bundle is for a Node.js environment

    externals: [nodeExternals()], // Exclude node_modules to reduce final bundle size

    output: {
        path: path.resolve(__dirname, "dist"), // Output directory
        filename: "[name].js", // Dynamic filename based on chunk name
        chunkFilename: "[name].chunk.js", // Lazy-loaded chunk filenames
    },

    module: {
        rules: [
            {
                test: /\.js$/, // Apply rule to all JavaScript files
                exclude: /node_modules/, // Exclude node_modules for faster builds
                use: {
                    loader: "babel-loader", // Transpile ES6+ to ES5
                },
            },
        ],
    },

    resolve: {
        extensions: [".js"], // Allows imports without specifying ".js" extensions
    },

    mode: isProduction ? "production" : "development", // Use "production" for optimization, "development" for debugging

    optimization: {
        splitChunks: {
            chunks: "all", // Enable chunk splitting
            minSize: 20000, // Minimum size (20KB) to create a chunk
            maxSize: 50000, // Maximum size (50KB) per chunk
            automaticNameDelimiter: "-", // Naming convention
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
            "process.env.PORT": JSON.stringify(process.env.PORT),
            "process.env.MONGO_URI": JSON.stringify(process.env.MONGO_URI),
        }),
    ],
};
