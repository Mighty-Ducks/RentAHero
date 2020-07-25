const path = require('path');

module.exports = {
    module: {
      entry: path.join(__dirname, './client/index.js'),
      mode: 'development',
      devtool: 'source-map',
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
      },
      rules: [
        {
          test:/\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins:['@babel/plugin-proposal-class-properties']
            }
          }
        }
      ]
    }
  };