
module.exports = {
  pwa: {
    name: 'Peter Ehses / Portfolio',
    themeColor: '#00b4bf',
    msTileColor: '#00b4bf',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      "name": "Peter Ehses - Portfolio",
      "short_name": "Peter Ehses",
      "icons": [
        {
          "src": "/img/icons/maskable_icon.png",
          "sizes": "3283x3283",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/img/icons/maskable_icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/img/icons/maskable_icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/img/icons/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/img/icons/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "start_url": "/",
      "display": "standalone",
      "background_color": "#303030",
      "theme_color": "#00b4bf",
      // "shortcuts": [
      //   {
      //     "name": "projects",
      //     "short_name": "projects",
      //     "description": "view projects",
      //     "url": "/projects",
      //     "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
      //   },
      // ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-144x144.png'
    },
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: "src/service-worker.js",
    //   // navigateFallback: 'index.html',
    //   // ...other Workbox options...
    // }
  }
}
