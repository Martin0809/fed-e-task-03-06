module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        ws: true,
        changeOrigin: true,
      },
      '/front': {
        target: 'http://eduboss.lagou.com',
      },
    },
  },
}
