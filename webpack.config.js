module.exports = {
	entry: "./src/index.jsx",
	mode: process.env.WEBPACK_MODE || "production",
	module: {
		rules: [{
			test: /\.jsx$/,
			use: "jsx-loader",
		}, {
			test: /\.scss$/,
			use: [
				"style-loader",
				"css-loader",
				"sass-loader",
			],
		}, {
			test: /\.png$/,
			use: "file-loader",
		}],
	},
	node: {
		fs: "empty",
	},
	output: {
		filename: "index.js",
		path: __dirname + "/dist",
	},
};