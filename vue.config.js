module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    filnameHashing: true,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc: 'service-worker.js',
      skipWaiting: true
    },
  }
}