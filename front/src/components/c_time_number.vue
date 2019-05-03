<template>

	<div
		class="number"
		v-bind:class="{'anim-tick-down': animated}"
		v-on:animationend=anim_off>


			<p class="value header-number father text-bold colour-minor">

				{{ time_values[1] }}

			</p>

			<p class="value header-number main text-bold colour-fill-bg">

				{{ time_change }}

			</p>

			<p class="value header-number son text-bold colour-minor">

				{{ time_values[2] }}

			</p>

			<p class="value header-number grandson colour-minor">

				{{ time_values[3] }}

			</p>


		<p class="time-stamp colour-fill-bg"> 
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
	}

/*color: hsla(200,30%,50%,1);*/

	.number-is-large .header-number {
		font-size: calc( var( --header-screen-large ) * 1.5);
	}
	.number-is-med .header-number {
		font-size: calc( var( --header-screen-large ) * 2.1);
	}
	.number-is-small .header-number {
		font-size: calc( var( --header-screen-large ) * 2.7);
	}

	.value.father {
		position: absolute;
		right: 0;
		transform: translateY(-50%) scale(0.4);
	}	
	.value.main {
		transform: scale(1);
	}	
	.value.son {
		position: absolute;
		right: 0;
		transform: translateY(50%) scale(0.4);
	}
	.value.grandson {
		position: absolute;
		right: 0;
		transform: translateY(60%) scale(0.2);
		opacity: 0;
	}


	.time-stamp{
		display: inline-block;
		position: absolute;
		bottom: 0;
		right: -.75rem;
	}



	.anim-tick-down .father {
		animation: anim-tick-father-keys .75s ease-in-out;
	}
	@keyframes anim-tick-father-keys {
		0% {
			opacity: 0;
			transform: translateY(-60%) scale(.1);
		}
		90% {
			opacity: 1;
			transform: translateY(-50%) scale(.4);
		}
	}

	.anim-tick-down .main {
		animation: anim-tick-main-keys .75s cubic-bezier(0.4, 0, 0.02, 1);
	}
	@keyframes anim-tick-main-keys {
		0% {
			color: hsla(200,5%,50%,1);
			transform: translateY(-50%) scale(.4);
		}
		33% {
			transform: translateY(-10%) scale(.55);
		}
		66% {
			transform: translateY(0) scale(1);
		}
		90% {
			transform: translateY(0) scale(1);
		}
	}

	.anim-tick-down .son {
		animation: anim-tick-son-keys .75s cubic-bezier(0.4, 0, 0.02, 1);
	}
	@keyframes anim-tick-son-keys {
		0% {
			color: var( --colour-inv );
			transform: translateY(0) scale(1);
		}	
		90% {
			transform: translateY(50%) scale(.4);
		}
	}

	.z-inverse .anim-tick-down .son {
		animation: anim-tick-son-keys-inv .75s cubic-bezier(0.4, 0, 0.02, 1);
	}
	@keyframes anim-tick-son-keys-inv {
		0% {
			color: var( --colour );
			transform: translateY(0) scale(1);
		}	
		90% {
			transform: translateY(50%) scale(.4);
		}
	}


	.anim-tick-down .grandson {
		animation: anim-tick-grandson-keys .75s ease-in-out;
	}
	@keyframes anim-tick-grandson-keys {
		0% {
			opacity: 1;
			transform: translateY(50%) scale(.4);
		}
		80% {
			opacity: 0;
			transform: translateY(60%) scale(.2);
		}
	}






</style>

