const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',
    // mode: "production",
    entry: {
        app: path.join(__dirname, './src/index')
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[id].[chunkhash].js',
        path: path.resolve(__dirname, './dist'),
        // pathinfo: false
    },
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'ts-loader',
            //     options: {
            //         transpileOnly: true,
            //         experimentalWatchApi: true,
            //     }
            // },
            {
                test: /\.(ts|tsx)?$/,
                include: [path.join(__dirname, 'src')],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
                            plugins: [
                                [
                                    "import",
                                    { libraryName: "antd", libraryDirectory: "lib", style: "css" }
                                ],
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                ["@babel/plugin-syntax-dynamic-import"]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.[(png)|(obj)|(json)]$/,
                loader: "file-loader"
            },
            //样式加载 css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //解析url
            // {
            //     test: /\.(woff|woff2|jpg|png)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             name: 'imanges/[hash].[ext]',
            //             limit: 5000,
            //             mimetype: 'application/font-woff'
            //         }
            //     }
            // },
            //样式加载 less
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                },
                { loader: 'css-loader', options: { sourceMap: false } },
                {
                    loader: "less-loader",
                    options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                include: [path.join(__dirname, "webapp-src")],
                exclude: /node_modules/,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    },
                    output: {
                        beautify: false,
                        comments: false
                    }
                }
            })
        ],
        // splitChunks: {
        // 	chunks: "async",
        // 	minSize: 30000,
        // 	maxSize: 0,
        // 	minChunks: 1,
        // 	maxAsyncRequests: 5,
        // 	maxInitialRequests: 3,
        // 	automaticNameDelimiter: "~",
        // 	name: true,
        // 	cacheGroups: {
        // 		vendors: {
        // 			test: /[\\/]node_modules[\\/]/,
        // 			priority: -10
        // 		},
        // 		default: {
        // 			minChunks: 2,
        // 			priority: -20,
        // 			reuseExistingChunk: true
        // 		}
        // 	}
        // }
    },
    // devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'D',
            template: './src/index.html',
            // inject: true
        })
    ],
    // 编译时控制台输出情况
    // stats: 'minimal',
};