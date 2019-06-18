const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'development',
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
        // modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
        // plugins: [
        //     new TsconfigPathsPlugin({
        //         configFile: path.join(__dirname, 'tsconfig.json'),
        //         extensions: [".ts", ".tsx", ".js"]
        //     })
        // ],
        // alias: { mobx: path.join(__dirname, 'node_modules/mobx/lib/mobx.es6.js') }
    },
    devtool: 'source-map',
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