<template>

	<div>

		<c-time-bg
			v-bind:start=app.timer
			v-bind:input=app.time
			></c-time-bg>

		<p class="text text-bold text-light"> Pomodora App </p>


		<!-- <input 
			v-model=app.time
			type="number" 
			name=""> -->

		<button
			class="button"
			v-on:click=start>

			<p class="text text-bold">
				Start
			</p>

		</button>

		<button
			class="button"
			v-on:click=continue_on>

			<p class="text text-bold">
				Continue
			</p>

		</button>

		<button
			class="button"
			v-on:click=pause>

			<p class="text text-bold">
				Pause
			</p>

		</button>

		<button
			v-on:click=stop>
			
			<p class="text text-bold">
				Stop
			</p>

		</button>

		<button
			v-on:click=reset>
			
			<p class="text text-bold">
				Reset
			</p>

		</button>		

	</div>
	

</template>

<script>
// @ is an alias to /src
import TimeBG from '@/components/c_time_bg.vue';

import { timer } from '../mixins/m_timer.js';


export default {
	name: 'home',
	mixins: [ timer ],
	data(){
		return {
			app : {
				time : 0,
				timer : 200,
			},
		}
	},
	methods : {

		start : function(){
			console.log('start');
			this.app.time = 0;
			this.timer_setup( 0, this.app.timer, this.update );
			this.timer_start();
		},
		pause : function(){
			console.log('paused');
			this.timer_stop();
		},		
		continue_on : function(){
			console.log('continue');
			this.timer_start();
		},
		stop : function(){
			console.log('stop');
			this.timer_stop();
		},
		reset : function(){
			console.log('reset');
			this.timer_clear();
			this.app.time = 0;
		},

		update : function(a,b){
			this.app.time = a;
		},

	},
	components: {
		'c-time-bg' : TimeBG,
	},
}
</script>
