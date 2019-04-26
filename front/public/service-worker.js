if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

	// install new service worker when ok, then reload page.
	self.addEventListener("message", msg=>{
		if (msg.data.action=='skipWaiting'){
			self.skipWaiting()
		}
	});


} 
else {
    console.log(`Workbox didn't load`);
}




