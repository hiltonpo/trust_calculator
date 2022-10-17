
/*eslint-disable*/

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-tw|en/
      )
    ]
  },
  chainWebpack: config => {
    /*config
    .plugin('webpack-bundle-analyzer')
    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);*/

    config.output.pathinfo = false;
    config.optimization.usedExports = true;
    config.optimization.sideEffects = true;
    
    if(process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').use(TerserPlugin, [{
        terserOptions: {
          compress: {
            drop_console: true
          },
          comments: false
        }
      }]);
    }
  }, 
  css: {
    extract: {
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].css'
    }
  },
  // pages: {
  //   InputResult: {
  //     entry: 'src/main.ts',
  //     template: 'public/index.html',
  //     filename: 'InputResult.html',
  //     title: '阿爾發-機器理財信託試算系統',
  //     chunks: [
  //       'chunk-vendors',
  //       'chunk-common',
  //       'TrustCalculator'
  //     ]
  //   }
  // },
  transpileDependencies: [
    'vuetify'
  ]
};
