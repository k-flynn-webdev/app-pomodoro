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
		},
		registered (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }
			document.dispatchEvent(ev_sw_register);
		},
		cached (registration) {
			setWorker(registration);
		},
		updatefound (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_update_found);
		},
		updated (registration) {
			setWorker(registration);
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_update_ready);

			document.addEventListener('SW_update_accept', function(){
				registration.waiting.postMessage({action: "skipWaiting"});
			});
		},
		offline () {
			if( !hasWorker() ){ return; }			
			document.dispatchEvent(ev_sw_offline);
		},
		error (error) {
			// console.error('Error during service worker registration:', error);
		}
	})

}
