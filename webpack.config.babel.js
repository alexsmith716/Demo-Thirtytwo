import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

const DIST_PATH = path.resolve(__dirname, 'public/dist');

const getConfig = (target) => ({
	name: target,
	mode: 'development',
	target,
	entry: target === 'node' ? './src/server/renderer.js' : './src/client/index.js',
	externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
	output: {
		path: path.join(DIST_PATH, target),
		filename: '[name].[chunkhash:8].js',
		//  chunkFilename: '[name].[contenthash].js',
		publicPath: `/dist/${target}/`,
		libraryTarget: target === 'node' ? 'commonjs2' : undefined,
	},

	module: {
		rules: [

			//	{
			//		test: require.resolve('../node_modules/graphiql/esm/components/QueryEditor.js'),
			//		use: [{
			//			loader: 'imports-loader',
			//			options: {
			//				type: 'module',
			//				imports: ['default process/browser process'],
			//			},
			//		}],
			//	},

			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: [],
				include: /node_modules/,
			},

			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader',
			},

			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},

			{
				test: /\.(css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},

			{
				test: /\.(scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								outputStyle: 'compressed',
							},
						},
					},
				],
			},

      {
        test: /\.(gif|jpg|svg|png|ico|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash:8].[ext]',
            },
          },
        ],
      },

      //  {
      //  	test: /\.(gif|jpg|svg|png|ico|woff|woff2|ttf)$/,
      //  	use: [
      //  		{
      //  			loader: 'url-loader',
      //  			options: {
      //  				esModule: false,
      //  			},
      //  		},
      //  	],
      //  },
		],
	},

	performance: {
		hints: false,
	},

	optimization: {
		minimize: true,
		//  minimizer: [
		//  	new TerserPlugin({
		//  		terserOptions: {
		//  			output: {
		//  				comments: false,
		//  			},
		//  			compress: {
		//  				drop_console: true,
		//  			},
		//  		},
		//  	}),
		//  ],
		//	https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
    	chunks: 'all',
    	maxInitialRequests: Infinity,
    	//	minSize: 20000,
    	minSize: 64000,
    	cacheGroups: {
    		defaultVendors: {
    			test: /\/node_modules\//,
    			name(module) {
    				const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    				return `npm.${packageName.replace('@', '')}`;
    			},
    		},
    	},
    },
		//	runtimeChunk: {
		//		name: 'manifest',
		//	},
		//	splitChunks: {
		//		minSize: 10000,
		//		maxSize: 250000,
		//		cacheGroups: {
		//			defaultVendors: {
		//				test: /node_modules/,
		//				chunks: 'all',
		//				enforce: true,
		//			},
		//		},
		//	},
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss', '.mjs'],
		//	fallback: {
		//		'assert': require.resolve('assert/'),
		//	}
	},

	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new CopyPlugin({
			patterns: [{ from: './src/public', to: DIST_PATH },],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css'
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		//	new webpack.DefinePlugin({}),
		new LoadablePlugin(),
		//	new BundleAnalyzerPlugin({
		//		analyzerMode: "static",
		//		openAnalyzer: false,
		//	}),
	],
})

export default [ getConfig('web'), getConfig('node') ]
