<template>

	<div
		class="number holder"
		v-bind:class="{'anim-tick-down': animated}"
		v-on:animationend=anim_off>

			<p class="value header grand">

				{{ time_values[3] }}

			</p>

			<p class="value header father ">				

				{{ time_values[2] }}

			</p>

			<p class="value header main">				

				{{ time_change }}

			</p>

			<p class="value header son">				

				{{ time_values[0] }}

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
			return this.time_values[1];
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
		/*transition: .5s;*/
	}
	.value.grand {
		position: absolute;
		right: 0;
		top: -6rem;
		z-index: -1;
		opacity: .3;
		transform: scale(0.6);
	}
	.value.father {
		position: absolute;
		right: 0;
		top: -3.3rem;
		z-index: -1;
		opacity: 0.6;
		transform: scale(0.75);
	}	
	.value.main {
		transform: scale(1);
		opacity: 1
	}	
	.value.son {
		position: absolute;
		right: 0;
		top: 3.3rem;
		z-index: -1;
		opacity: 0.2;
		transform: scale(0.6);
	}



	.time-stamp{
		display: inline-block;
		position: absolute;
		z-index: 1;
		bottom: 5%;
		right: 5%;
	}

	.anim-tick-down .grand {
		animation: anim-tick-grand-keys 2s ease-in-out;
	}
	@keyframes anim-tick-grand-keys {
		0% {
			opacity: 0;
			transform: translateY(-1.4rem) scale(.2);
		}
		100% {
			opacity: .3;
			transform: translateY(0) scale(.6);
		}
	}

	.anim-tick-down .father {
		animation: anim-tick-father-keys 2s ease-in-out;
	}
	@keyframes anim-tick-father-keys {
		0% {
			opacity: .3;
			transform: translateY(-2.7rem) scale(.6);
		}
		100% {
			opacity: .6;
			transform: translateY(0) scale(.75);
		}
	}

	.anim-tick-down .main {
		animation: anim-tick-main-keys 2s ease-in-out;
	}
	@keyframes anim-tick-main-keys {
		0% {
			opacity: .6;
			transform: translateY(-3.3rem) scale(.75);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.anim-tick-down .son {
		animation: anim-tick-son-keys 2s ease;
	}
	@keyframes anim-tick-son-keys {
		0% {
			opacity: 1;
			transform: translateY(-3.3rem) scale(1);
		}
		100% {
			opacity: .2;
			transform: translateY(0) scale(.6);
		}
	}








</style>

