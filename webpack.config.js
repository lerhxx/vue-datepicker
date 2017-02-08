let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/js'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.styl$/,
			exclude: /node_modules/,
			loaders: ["style-loader", "css-loader", "stylus-loader"]
		}, {
			test: /\.js$/,
			loader: 'babel-loader?presets=es2015',
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			exclude: /node_modules/,
			loader: 'url-loader?name=[name].[ext]?[hash]'
		}]
    },
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				vue: {
					loaders: {
						js: 'babel-loader'
					}
				}
			}
		})
	],
    resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}