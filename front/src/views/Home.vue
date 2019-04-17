<template>

	<div>

		<!-- <c-time-bg
			v-bind:start=app.timer
			v-bind:input=app.time
			></c-time-bg> -->

		<c-time-numbers
			v-bind:start=app.timer
			v-bind:input=app.time
			></c-time-numbers>

		<p class="text text-bold text-light"> Pomodora App </p>

		<div class="controls">

			<c-time-control
				v-bind:play=play
				v-bind:pause=pause
				v-bind:stop=stop
				v-bind:resume=resume
				v-bind:reset=reset>
			</c-time-control>

		</div>

	</div>
	

</template>

<script>
// @ is an alias to /src
import TimeBG from '@/components/c_time_bg.vue';
import TimeNumbers from '@/components/c_time_numbers.vue';
import TimeControl from '@/components/c_time_controller.vue';

import { timer } from '../mixins/m_timer.js';


export default {
	name: 'home',
	mixins: [ timer ],
	data(){
		return {
			app : {
				time : 0,
				timer : 15*60,
				mode : 'stop',
			},
		}
	},

	methods : {

		play : function(){
			console.log('play');
			this.app.time = 0;
			this.timer_setup( 0, this.app.timer, this.update );
			this.timer_start();
		},
		pause : function(){
			console.log('paused');
			this.timer_stop();
		},		
		resume : function(){
			console.log('resume');
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
		'c-time-numbers' : TimeNumbers,
		'c-time-control' : TimeControl,
	},
}
</script>

<style scoped>
	
	.controls {
		position: absolute;
		z-index: 5;
		left: 0;
		bottom:15%;
		width: 100%;
		/*height: 30vh;*/
		text-align: center;
	}

</style>
