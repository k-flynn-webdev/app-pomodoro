<template>

	<div class="controllers">

		<button
			v-if=display.play
			class="button colour-text-light ic"
			v-on:click=play_control>

			<svg
				class=""
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
			class="button colour-text-light ic"
			v-on:click=resume_control>

			<svg
				class=""
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
			class="button colour-text-light ic"
			v-on:click=pause_control>

			<svg
				class=""
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
			class="button colour-text-light ic"
			v-on:click=stop_control>
			
			<svg
				class=""
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

		<button
			v-if=display.reset
			class="button colour-text-light ic"	
			v-on:click=reset_control>
			
			<svg
				class=""
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.55,0.499c61.57,0 111.557,49.987 111.557,111.558c0,61.57 -49.987,111.557 -111.557,111.557c-61.571,0 -111.558,-49.987 -111.558,-111.557c0,-61.571 49.987,-111.558 111.558,-111.558Zm46.312,95.57c8.056,7.895 10.334,12.417 10.334,24.578c0,23.835 -10.248,34.145 -34.02,34.414l0.069,32.496l-57.297,-37.17l57.297,-37.169l-0.069,33.258c17.785,-0.269 25.435,-7.981 25.435,-25.829c0,-9.998 -2.086,-13.748 -9.174,-19.738l7.425,-4.84Zm-92.624,32.976c-8.057,-7.896 -10.334,-12.418 -10.334,-24.578c0,-23.835 10.247,-34.145 34.019,-34.415l-0.069,-32.495l57.298,37.169l-57.298,37.169l0.069,-33.257c-17.785,0.269 -25.435,7.981 -25.435,25.829c0,9.997 2.086,13.748 9.174,19.737l-7.424,4.841Z"/>

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
				reset : false,
				resume : false,
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
					this.display.reset = false;
					this.display.resume = false;
					break;
				case 'pause':
					this.display.play = false;
					this.display.pause = false;
					this.display.stop = true;
					this.display.reset = false;
					this.display.resume = true;
					break;
				case 'resume':
					this.display.play = false;
					this.display.pause = true;
					this.display.stop = true;
					this.display.reset = false;
					this.display.resume = false;
					break;
				case 'stop':
					this.display.play = true;
					this.display.pause = false;
					this.display.stop = false;
					this.display.reset = true;
					this.display.resume = false;
					break;
				case 'reset':
					this.display.play = true;
					this.display.pause = false;
					this.display.stop = false;
					this.display.reset = true;
					this.display.resume = false;					
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
		reset_control : function(){
			this.$root.$emit('mode_set', 'reset');
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
		/*background-color: hsla(1,10%,50%,.1);*/
	}

	.ic {
		height: 5rem;
		fill-rule:evenodd;
		clip-rule:evenodd;
		stroke-linejoin:round;
		stroke-miterlimit:1.4;
		/*position: absolute;*/
	}

	.play {

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

