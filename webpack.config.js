const CleanWebpackPlugin = require('clean-webpack-plugin');
const Path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Webpack = require('webpack');


const options = {
    //True: pass $ variable to all scripts (install from npm first).
    //Note: import $ from jquery is preferred as this is faster .
    provide_jquery: false
}

module.exports = (env) => {
    let DEV = (env && env.development);
    let hash = (DEV ? '' : '.[fullhash]');


    let providejQuery = {};
    if(options.provide_jquery) {
        providejQuery = {
            $: 'jquery',
            jQuery: 'jquery',
        }
    }

    return {
        mode: DEV ? 'development' : 'production',
        devtool: DEV ? 'source-map' : false,
        context: Path.join(__dirname, './src'),
        entry: {
            main: [
                './scss/main.scss',
                './js/main.js',
            ]
        },
        output: {
            filename: `[name]${hash}.js`,
            path: Path.resolve(__dirname, 'public/assets/build'),
            publicPath: '/assets/build/',
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"), // Prefer `dart-sass`
                                sourceMap: true,
                                sassOptions: {
                                    fiber: false,
                                    indentWidth: 4,
                                },
                            },
                        }
                    ],
                },

                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2|ttf|otf|eot)$/i,
                    type: 'asset/resource'
                },

            ],
        },
        plugins: [
            new CleanWebpackPlugin([
                './public/assets/build/*',
            ]),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: `[name]${hash}.css`,
                // chunkFilename: "[id].css",
            }),
            new StyleLintPlugin({
                context: Path.join(__dirname, './src/scss'),
                files: '**/*.scss',
                fix: true
            }),
            new WebpackManifestPlugin(),
            new Webpack.ProvidePlugin(providejQuery),
            new Webpack.DefinePlugin({
                "process.env": {
                    DEV: DEV
                }
            })
        ],
    };
};
