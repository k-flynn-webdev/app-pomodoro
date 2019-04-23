<template>

	<div class="controllers"
		v-bind:class="{ 'is-near' : display.near }">

		<button
			v-if=display.play
			class="button ic"
			v-on:click=play_control>

			<svg
				class="colour-fill-bg"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.434,0.799c61.571,0 111.558,49.988 111.558,111.558c0,61.57 -49.987,111.558 -111.558,111.558c-61.57,0 -111.557,-49.988 -111.557,-111.558c0,-61.57 49.987,-111.558 111.557,-111.558Zm78.276,111.558l-124.936,81.046l0,-162.092l124.936,81.046Z"/>

			</svg>


		</button>

		<button
			v-if=display.resume
			class="button ic"
			v-on:click=resume_control>

			<svg
				class="colour-fill-bg"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.434,0.799c61.571,0 111.558,49.988 111.558,111.558c0,61.57 -49.987,111.558 -111.558,111.558c-61.57,0 -111.557,-49.988 -111.557,-111.558c0,-61.57 49.987,-111.558 111.557,-111.558Zm78.276,111.558l-124.936,81.046l0,-162.092l124.936,81.046Z"/>

			</svg>

		</button>

		<button
			v-if=display.pause
			class="button ic"
			v-on:click=pause_control>

			<svg
				class="colour-fill-bg"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.434,0.499c61.571,0 111.558,49.987 111.558,111.558c0,61.57 -49.987,111.557 -111.558,111.557c-61.57,0 -111.557,-49.987 -111.557,-111.557c0,-61.571 49.987,-111.558 111.557,-111.558Zm-10,42.422l-40,0l0,137l40,0l0,-137Zm60,0l-40,0l0,137l40,0l0,-137Z"/>

			</svg>

		</button>

		<button
			v-if=display.stop
			class="button ic"
			v-on:click=stop_control>
			
			<svg
				class="colour-fill-bg"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.55,0.799c61.57,0 111.557,49.988 111.557,111.558c0,61.57 -49.987,111.558 -111.557,111.558c-61.571,0 -111.558,-49.988 -111.558,-111.558c0,-61.57 49.987,-111.558 111.558,-111.558Zm52.307,52.922l-104.615,0l0,116l104.615,0l0,-116Zm0,0l0,116l0,-116Z"/>

			</svg>

		</button>

		



	</div>

</template>

<script>

export default {
	name: 'cTimeControlVisual',
	data(){
		return {
			display : {
				play : false,
				pause : false,
				stop : false,
				resume : false,
				near : false,
			}
		}
	},

	computed : {
	},

	methods : {

		mode_display : function( input ){

			switch( input ){

				case 'play':
					this.display.play = false;
					this.display.pause = true;
					this.display.stop = true;
					this.display.resume = false;
					this.display.near = false;
					break;
				case 'pause':
					this.display.play = false;
					this.display.pause = false;
					this.display.stop = true;
					this.display.resume = true;
					this.display.near = false;
					break;
				case 'resume':
					this.display.play = false;
					this.display.pause = true;
					this.display.stop = true;
					this.display.resume = false;
					this.display.near = false;
					break;
				case 'stop':
					this.display.play = true;
					this.display.pause = false;
					this.display.stop = false;
					this.display.resume = false;
					this.display.near = false;
					break;
				case 'near':
					this.display.near = true;
					break;
				case 'finished':
					this.display.play = true;
					this.display.pause = false;
					this.display.stop = false;
					this.display.resume = false;
					this.display.near = true;
					break;

				default :
			}
		},

		play_control : function(){
			this.$root.$emit('mode_set', 'play');
		},
		pause_control : function(){
			this.$root.$emit('mode_set', 'pause');
		},
		stop_control : function(){
			this.$root.$emit('mode_set', 'stop');
		},
		resume_control : function(){
			this.$root.$emit('mode_set', 'resume');
		},
	},

	mounted(){
		this.$root.$on('mode_display', this.mode_display);
	},	

}

</script>

<style scoped >
	
	button {
		min-width: unset;
		background-color: unset;
	}

	.controllers {
		width: 100%;
	}

	.ic {
		height: 5rem;
		fill-rule:evenodd;
		clip-rule:evenodd;
		stroke-linejoin:round;
		stroke-miterlimit:1.4;
		opacity: 1;
		transition: .5s;
	}

	.is-near .ic{
		opacity: 0;
		pointer-events: none;
	}


/*	@keyframes anim-timer-ticker {
		0% {
			transform: translateX(0);
		}		
		100% {
			transform: translateX(100%);
		}
	}*/


</style>

