    module.exports = {
      mode: 'development',
      entry: './src/index.js', // Adjust the entry point if needed
      output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
      },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    };