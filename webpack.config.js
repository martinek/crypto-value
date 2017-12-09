const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = {
    prod: process.env.NODE_ENV === 'production',
    port: 9000,
};

const TITLE = 'crypto-value.info';

const addItem = (add, item) => add ? item : undefined;
const ifProd = item => addItem(env.prod, item);
const ifDev = item => addItem(!env.prod, item);
const removeEmpty = array => array.filter(i => !!i);
const prodDevValue = (prod, dev) => env.prod ? prod : dev;

module.exports = {
    entry: {
        app: removeEmpty([
            ifDev('react-hot-loader/patch'),
            ifDev(`webpack-dev-server/client?http://localhost:${env.port}`),
            ifDev('webpack/hot/only-dev-server'),
            './index.js',
            './assets/stylesheets/app.scss',
        ]),
    },
    output: {
        filename: 'bundle.[name].[hash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: prodDevValue('false', 'eval'),
    bail: env.prod,
    node: {
        fs: 'empty',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|sass|scss)/,
                use: removeEmpty([ifDev('css-hot-loader')].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {plugins: () => [autoprefixer]},
                        },
                        'sass-loader',
                    ],
                })))
                ,
            },
            {
                test: /\.(png|jpg|gif|otf|eot|svg|ttf|woff|woff2)/,
                use: [{loader: 'url-loader', options: {limit: 8192, name: 'assets/[name]-[hash].[ext]'}}],
            },
        ],
    },
    plugins: removeEmpty([
        ifDev(new webpack.HotModuleReplacementPlugin()),
        ifProd(new webpack.NamedModulesPlugin()),
        ifProd(new webpack.NamedChunksPlugin()),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html.ejs',
            title: TITLE,
        }),
        new ExtractTextPlugin({
            filename: prodDevValue('[name].[chunkhash].css', '[name].css'),
            disable: false,
            allChunks: true,
        }),
        ifProd(new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            quiet: true,
        })),
        new webpack.DefinePlugin({
            'PAGE_TITLE': JSON.stringify(TITLE),
        }),
        ifProd(new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })),
        ifProd(new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // eslint-disable-line
                warnings: false,
            },
        })),
        ifProd(new CopyWebpackPlugin([
            // relative path is from src
            { from: '../static' },
        ], {
            // ignore hidden files
            ignore: ['.*'],
        })),
    ]),
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'static'),
        publicPath: '/',
        compress: true,
        port: env.port,
    },
    resolve: {
        alias: {
            components: resolve(__dirname, 'src/components'),
            lib: resolve(__dirname, 'src/lib'),
            sources: resolve(__dirname, 'src/sources'),
            constants: resolve(__dirname, 'src/constants'),
            assets: resolve(__dirname, 'src/assets'),
            actions: resolve(__dirname, 'src/actions'),
            reducers: resolve(__dirname, 'src/reducers'),
        },
    },
};
