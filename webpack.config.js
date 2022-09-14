const { glob } = require('glob')
const path = require('path')
const PugPlugin = require('pug-plugin')

module.exports = {
  // Set to production to minify JS files.
  mode: 'development',

  // Handle all .pug files into the pages folder
  // so all this pages will be an entry points.
  entry: glob.sync('./src/views/pages/*.pug').reduce((obj, el) => {
    obj[path.parse(el).name] = el

    return obj
  }, {}),

  // Set output options.
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    clean: true,
  },

  plugins: [
    // Enable processing of Pug files defined in webpack entry.
    new PugPlugin({
      extractCss: {
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],

  // Needs to use require typescript files inside pug.
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|webp|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(woff2|woff|ttf|otf|svg|eot)/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render',
          embedFilters: {
            escape: true,
            markdown: {
              highlight: {
                verbose: true,
                use: 'prismjs',
              },
            },
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
