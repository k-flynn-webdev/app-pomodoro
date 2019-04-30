<template>
	<div id="app">
		<!-- <div id="nav"> -->
		<!-- <router-link to="/">Home</router-link> | -->
		<!-- <router-link to="/about">About</router-link> -->
		<!-- </div> -->
		<router-view/>
	</div>
</template>


<script>

// adding global style ..
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');
require('@/assets/style/anim.css');



export default {
	name: 'cApp',
	
	methods : {
		pwa_init_events : function(){
			document.addEventListener('SW_register', this.pwa_register);
			document.addEventListener('SW_ready', this.pwa_ready);
			document.addEventListener('SW_update_found', this.pwa_update_found);
			document.addEventListener('SW_update_ready', this.pwa_update_ready);
			document.addEventListener('SW_offline', this.pwa_offline);
		},
		pwa_register : function(){
			console.log('sw worker registered.');
		},
		pwa_ready : function(){
			console.log('sw worker ready.');
		},		
		pwa_update_found : function(){
			console.log('sw worker update found.');
		},
		pwa_update_ready : function(){
			console.log('sw worker update ready.');
		},		
		pwa_offline : function(){
			console.log('sw worker offline.');
		},


	},
	mounted(){
		this.pwa_init_events();
	},
}


</script>


<style>




</style>
