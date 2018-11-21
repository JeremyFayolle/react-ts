const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const devRegExp = /^DEV(ELOPMENT)?$/i;
const prodRegExp = /^PROD(UCTION)?$/i;
const MODE = prodRegExp.test(process.env['NODE_ENV']) ? 'PRODUCTION' : devRegExp.test(process.env['NODE_ENV']) ? 'DEVELOPMENT' : null;
if (!MODE) {
  console.error(new Error('Invalid mode'));
  process.exit(1);
}

module.exports = {
    entry: {
      index: './src/client/index.tsx',
      styles: './src/client/styles.scss'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/client'
    },

    mode: MODE === 'DEVELOPMENT' ? 'development' : 'production',

    plugins: [
      ...(
        MODE === 'DEVELOPMENT' ?
          [new HtmlWebpackPlugin({template: __dirname + '/src/client/index.ejs', templateParameters: {mode: 'DEVELOPMENT'}})] :
          []
      ),
      new MiniCssExtractPlugin()
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: {configFileName: './src/client/tsconfig.json'} },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
              test: /\.s?css$/,
              use: [
                MODE === 'DEVELOPMENT' ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ],
            },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    devServer: {
      after: devServerApp => {
        require('./dist/server/index').buildServer().then(serverApp => devServerApp.use(serverApp))
      },
      contentBase: path.join(__dirname, '/src/client'),
      compress: true,
      port: 9000,
      open: 'Chrome',
      watchContentBase: true,
      historyApiFallback: true
    }

};
