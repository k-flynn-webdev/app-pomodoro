process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
	pwa: {
		name: 'pomodoro',
		msTileColor: '#191339',

		// appleMobileWebAppCapable: 'yes',
		// appleMobileWebAppStatusBarStyle: 'black',

		// configure the workbox plugin
		// workboxPluginMode: 'GenerateSW',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			// swSrc is required in InjectManifest mode.
			swSrc: "public/service-worker.js",
			// ...other Workbox options...
		},
	}
}