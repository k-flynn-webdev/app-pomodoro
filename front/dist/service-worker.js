importScripts("/precache-manifest.af0284471b224f78f580d23bdb760a34.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

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





