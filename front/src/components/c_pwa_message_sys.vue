<template>

	<div 
		class="pwa-notify-modal">


		<c-pwa-message 
			v-for="(message, index) in window.messages">
			{{ message }}
		</c-pwa-message>
		
	</div>	


</template>

<script>


import cPWAMessage from './components/c_pwa_message.vue'



export default {
	name: 'cPWAMessageSys',
	data(){
		return {
			attrs : {
			},

			window : {
				messages : [],
			},

		}
	},
	


	methods : {
	



	},
	mounted(){		


	},

	components: {
		'c-pwa-message' : cPWAMessage,
	},	

}
</script>

<style scoped>
		
	.pwa-notify-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 5;
	}

</style>
