importScripts("/precache-manifest.83fa2ffe15d6cfc0469a46034aa6eb14.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);

	// // install new service worker when ok, then reload page.
	self.addEventListener('message', msg=>{
		if (msg.data.action=='skipWaiting'){
			self.skipWaiting()
		}
	});

} 
else {
	console.log(`Workbox didn't load`);
}





