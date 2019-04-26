/* eslint-disable no-console */

import { register } from 'register-service-worker'


if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready (registration) {
			console.log('App is being served from cache by a service worker.\n' +
			'For more details, visit https://goo.gl/AFskqB');
			// console.log( registration );
		},
		registered (registration) {
			console.log('Service worker has been registered.');
			// console.log( registration );
		},
		cached (registration) {
			console.log('Content has been cached for offline use.');
			// console.log( registration );
		},
		updatefound (registration) {
			console.log('New content is downloading.');
			// console.log( registration );
		},
		updated (registration) {
			console.log('New content is available; please refresh.');
			
			// emit from here to app dialog?

			// return result and acton it

			let confirmationResult = confirm("New content found! Do you want to reload the app?")
			if (confirmationResult) registration.waiting.postMessage({action: "skipWaiting"})
			// console.log( registration );
		},
		offline () {
			console.log('No internet connection found. App is running in offline mode.');
		},
		error (error) {
			console.error('Error during service worker registration:', error);
		}
	})

	let refreshing1;
	navigator.serviceWorker.addEventListener("controllerchange", e=>{
		if (refreshing) return
		window.location.reload()
		refreshing1 = true
	})



}
