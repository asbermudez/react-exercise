module.exports = {
  test: /\.(?:le|c)ss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        importLoaders: 1,
      },
    },
  ],
};
