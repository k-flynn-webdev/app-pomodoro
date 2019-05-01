if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);

	// // install new service worker when ok, then reload page.
	self.addEventListener('message', msg=>{
		if (msg.data.action=='skipWaiting'){
			console.log('service worker: skip.waiting');
			self.skipWaiting()
		}
	});

	// self.addEventListener('message', function(event){
	// 	console.log("SW Received Message: " + event.data);
	// });	

	// console.log( 'worker file' );
	// console.log( self );

} 
else {
	console.log(`Workbox didn't load`);
}




