let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: {
    	app: ['./src/main.js'],
    	demo: './src/demo.js'
	},
    output: {
        path: path.resolve(__dirname, './dist/js'),
        publicPath: '/dist/',
        filename: '[name].js'
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
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	],
    resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	devServer: {
		inline: true,
		hot: true,
		'/get': {
			target: 'localhost:3000',
			secure: false
		}
	}
}