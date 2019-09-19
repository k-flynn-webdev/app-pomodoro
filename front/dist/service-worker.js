importScripts("/precache-manifest.171e7292a7eb8800f37b3f69da85a4d2.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

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





