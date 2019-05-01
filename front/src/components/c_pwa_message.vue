<template>

	<div>

		{{ message }}

	<!-- <div 
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


		</div> -->


		
	</div>	


</template>

<script>






export default {
	name: 'cPWAMessage',
	props : {
		message : Object,
	},
	methods : {
		pwa_close : function(){
			this.message.close();
		},
	},
}
</script>

<style scoped>

	.message {
		transition-delay: .33s;
		margin: .5rem;
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
