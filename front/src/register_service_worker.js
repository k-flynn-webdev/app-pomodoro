/* eslint-disable no-console */

import { register } from 'register-service-worker'



let sw_obj = null;
let ev_sw_register = new Event("SW_register");
let ev_sw_ready = new Event("SW_ready");
let ev_sw_update_found = new Event("SW_update_found");
let ev_sw_update_ready = new Event("SW_update_ready");
let ev_sw_offline = new Event("SW_offline");

let sw_refreshing;

function setWorker( obj ){
	sw_obj = obj;
	navigator.serviceWorker.addEventListener("controllerchange", e=>{
		if (sw_refreshing) return
		window.location.reload()
		sw_refreshing = true
	});
}
function hasWorker(){
	if( sw_obj !== null ){
		return true;
	}
	return false;
}







if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }
			document.dispatchEvent(ev_sw_ready);
			

			// console.log('App is being served from cache by a service worker. \n For more details, visit https://goo.gl/AFskqB');
		},
		registered (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }
			document.dispatchEvent(ev_sw_register);

			// console.log('Service worker has been registered.');
			// console.log('registration');
			// console.log(registration);
			
			
			// document.dispatchEvent(ev_sw_register);


		},
		cached (registration) {
			setWorker(registration);
			


			// console.log('Content has been cached for offline use.');

		},
		updatefound (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_update_found);



			// console.log('New content is downloading.');

		},
		updated (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_update_ready);

			console.log('adding sw update accept function.');
			document.addEventListener('SW_update_accept', function(){
				console.log('sw update accept function triggered.');
				registration.waiting.postMessage({action: "skipWaiting"});
			});


			// console.log('New content is available; please refresh.');
			
			// emit from here to app dialog?

			// return result and acton it

			// document.dispatchEvent(ev_sw_update, registration);


			// let confirmationResult = confirm("New content found! Do you want to reload the app?")
			// if (confirmationResult) registration.waiting.postMessage({action: "skipWaiting"})
			
			// console.log( registration );
		},
		offline () {
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_offline);
			


			// console.log('No internet connection found. App is running in offline mode.');
		},
		error (error) {
			// console.error('Error during service worker registration:', error);
		}
	})





}
