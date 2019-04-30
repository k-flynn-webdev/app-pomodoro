<template>

	<div 
		class="pwa-notify-modal colour-bg-inv anim-3"
		v-bind:class=getClass>

		<button
			class="close button ic"
			v-on:click=pwa_hide>

			<svg
				class="colour-fill-bg"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M32.764,191.393c-43.537,-43.537 -43.537,-114.23 0,-157.766c43.537,-43.537 114.229,-43.537 157.766,0c43.537,43.536 43.537,114.229 0,157.766c-43.537,43.537 -114.229,43.537 -157.766,0Zm78.883,-111.427l-42.186,-42.186l-32.544,32.544l42.186,42.186l-42.186,42.186l32.544,32.544l42.186,-42.186l42.186,42.186l32.544,-32.544l-42.186,-42.186l42.186,-42.186l-32.544,-32.544l-42.186,42.186Z"/>

			</svg>


		</button>




		<div class="message anim-3">

			<p class="text colour-fill-bg">
				 {{ window.message }}
			</p>

			<div ref="buttons">

				<button 
					class="button-option colour-bg"
					v-for="(item, index) in window.buttons"
					v-on:click.stop=item.onClick
					ref='option'>

					<p class="text1 colour-fill-bg-inv"> {{ item.label }}</p>

				</button>

			</div>


		</div>


			
		<!-- <p>
			This is a toast message.
		</p>

		<p> {{ mode }} </p> -->
		
	</div>	


</template>

<script>



let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function(event) {
	event.preventDefault();
	deferredPrompt = event;
});




export default {
	name: 'cPWAMessage',
	data(){
		return {
			attrs : {
				install : {
					timeToShow : 5 * 1000,
				}
			},

			window : {
				display : false,
				message : '',
				buttons : [],
			},

			worker : {
				object : null,
			},
			
		}
	},
	computed : {
		getClass : function(){
			if( this.window.display){
				return 'show'
			}
			return '';
		},
	},

	methods : {
		pwa_show_install : function(){
			if( this.window.display ){
				return;
			}

			if( deferredPrompt === null ){
				return;
			}

			this.window.message = 'Add app to homescreen?';
			
			this.window.buttons.push({
				label : 'install',
				onClick : this.pwa_install,
				onSetup : null,
			});

			this.$nextTick( function(){
				this.pwa_show();
			});

		},
		pwa_install : function(){
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice
				.then((choiceResult) => {

					//regardless of choice..
					this.pwa_hide();

				deferredPrompt = null;
			});
		},
		// setup_Install : function( input ){
		// 	// Installation must be done by a user gesture! Here, the button click
		// 	// input.addEventListener('click', (e) => {
		// 		// Show the prompt
		// 		deferredPrompt.prompt();
		// 		// Wait for the user to respond to the prompt
		// 		deferredPrompt.userChoice
		// 			.then((choiceResult) => {

		// 				//regardless of choice..
		// 				this.pwa_hide();

		// 			deferredPrompt = null;
		// 		});
		// 	// });
		// },

		pwa_show_update : function(){
			if( this.window.display ){
				return;
			}

			this.window.message = 'New version found.';
			
			this.window.buttons.push({
				label : 'update',
				onClick : this.pwa_update,
				onSetup : null,
			});

			console.log( this.window.buttons );

			this.$nextTick( function(){
				this.pwa_show();
			});

		},
		pwa_update : function(){
			let ev_sw_update_accept = new Event("SW_update_accept");
			document.dispatchEvent(ev_sw_update_accept);
			console.log('update button clicked.');
		},

		// pwa_option_install : function(){

			// deferredPrompt.prompt();  // Wait for the user to respond to the prompt
			// deferredPrompt.userChoice
			// .then(function(choiceResult){

			// 	if (choiceResult.outcome === 'accepted') {
			// 		console.log('User accepted the A2HS prompt');
			// 	} else {
			// 		console.log('User dismissed the A2HS prompt');
			// 	}

			// 	deferredPrompt = null;

			// });
 
		// },
		// pwa_cancel : function(){
		// 	this.pwa_hide();
		// },




		// pwa_update : function(){
			// console.log('test click');
			// function send_message_to_sw(msg){
			// let msg = ' update yay ';
			// navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'");
			// }
		// },

		// install_available : function(){
		// 	if( deferredPrompt !== null ){
		// 		this.attrs.install.available = true;
		// 	}
		// 	return this.attrs.install.available;
		// },







		pwa_show : function(){
			// run buttons final setup..
			for(let i = 0; i< this.window.buttons.length; i++){
				if( this.window.buttons[i].onSetup !== null ){
					this.window.buttons[i].onSetup( this.$refs.option[i] );
				}
			}
			this.window.display = true;
		},
		pwa_hide : function(){
			let self = this;
			setTimeout( function(){
				self.window.display = false;
				self.pwa_reset();
			}, 100);
		},


		pwa_reset : function(){
			this.window.buttons.splice(0,this.window.buttons.length);
		},

		pwa_init_events : function(){
			document.addEventListener('SW_register', this.pwa_register);
			document.addEventListener('SW_ready', this.pwa_ready);
			document.addEventListener('SW_update_found', this.pwa_update_found);
			document.addEventListener('SW_update_ready', this.pwa_show_update);
			document.addEventListener('SW_offline', this.pwa_offline);

			// if install is available?
			let self = this;
			setTimeout( function(){
				self.pwa_show_install();
			}, self.attrs.install.timeToShow );

		},


	},
	mounted(){		

		this.pwa_init_events();

		// let self = this;
		// setTimeout( function(){
		// 	self.pwa_show_install();
		// }, self.attrs.install.timeToShow );
		// self.$root.$on('install', self.pwa_show_install );

		// setTimeout( function(){
		// 	self.pwa_show_update();
		// }, self.attrs.install.timeToShow );
	},
}
</script>

<style scoped>
		
	.pwa-notify-modal {
		position: fixed;
		transform: translateY(-5rem);
		top: 0;
		left: 0;
		width: 100%;
		z-index: 5;
	}	

	.message {
		transition-delay: .33s;
		margin: .5rem;
		opacity: 0;
	}

	.pwa-notify-modal.show{
		transform: translateY(0.2rem);

	}
	.show .message{
		opacity: 1;
	}




	.button-option {
		min-width: unset;
		padding: .1rem .5rem;
		border-radius: 1rem;
		margin: .33rem;
		margin-top: .66rem;
	}


	.close {
		min-width: unset;
		background-color: unset;
	}
	.ic {
		height: 2.5rem;
		fill-rule:evenodd;
		clip-rule:evenodd;
		stroke-linejoin:round;
		stroke-miterlimit:1.4;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}


</style>
