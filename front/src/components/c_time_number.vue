<template>

	<div
		class="number holder"
		v-bind:class="{'anim-tick-down': animated}"
		v-on:animationend=anim_off>


			<p class="value header father text-bold">

				{{ time_values[1] }}

			</p>

			<p class="value header main text-bold">

				{{ time_change }}

			</p>

			<p class="value header son text-bold">

				{{ time_values[2] }}

			</p>

			<p class="value header grandson">

				{{ time_values[3] }}

			</p>


		<p class="time-stamp"> 
			<slot>
				
			</slot>
		</p>

	</div>

</template>

<script>

export default {
	name: 'cTimeNumber',
	data(){
		return {
			animated : false,
		}
	},

	props : {
		time_values : Array,
	},

	computed : {
		time_change : function(){
			this.animated = true;
			return this.time_values[0];
		}
	},

	methods : {
		anim_off : function(){
			this.animated = false;
		},
	},
}

</script>

<style scoped >

	.number {
		display: inline-block;
		position: relative;
	}

	.value {
		display: inline-block;
		margin: .75rem;
	}

	.value.father {
		position: absolute;
		right: 0;
		z-index: -1;
		opacity: 0.15;
		transform: translateY(-2.33rem) scale(0.4);
	}	
	.value.main {
		transform: scale(1);
		opacity: 1
	}	
	.value.son {
		position: absolute;
		right: 0;
		z-index: -1;
		opacity: 0.15;
		transform: translateY(2.3rem) scale(0.4);
	}
	.value.grandson {
		position: absolute;
		right: 0;
		z-index: -1;
		opacity: 0;
		transform: translateY(2.3rem) scale(0.2);
	}


	.time-stamp{
		display: inline-block;
		position: absolute;
		z-index: 1;
		bottom: 0;
		right: 0;
	}



	.anim-tick-down .father {
		animation: anim-tick-father-keys .75s ease-in-out;
	}
	@keyframes anim-tick-father-keys {
		0% {
			opacity: 0;
			transform: translateY(-3rem) scale(.1);
		}
		90% {
			opacity: .15;
			transform: translateY(-2.33rem) scale(.4);
		}
	}

	.anim-tick-down .main {
		animation: anim-tick-main-keys .75s cubic-bezier(0.4, 0, 0.02, 1);
	}
	@keyframes anim-tick-main-keys {
		0% {
			opacity: .15;
			transform: translateY(-2.33rem) scale(.4);
		}
		33% {
			opacity: .75;
			transform: translateY(-.5rem) scale(.55);
		}
		66% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		90% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.anim-tick-down .son {
		animation: anim-tick-son-keys .75s cubic-bezier(0.4, 0, 0.02, 1);
	}
	@keyframes anim-tick-son-keys {
		0% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}	
		90% {
			opacity: .15;
			transform: translateY(2.3rem) scale(.4);
		}
	}

	.anim-tick-down .grandson {
		animation: anim-tick-grandson-keys .75s ease-in-out;
	}
	@keyframes anim-tick-grandson-keys {
		0% {
			opacity: .15;
			transform: translateY(2.3rem) scale(.4);
		}
		80% {
			opacity: 0;
			transform: translateY(3.75rem) scale(.2);
		}
	}






</style>

