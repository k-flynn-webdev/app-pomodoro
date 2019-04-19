<template>

	<div>

		<c-time-control
			v-bind:play=play
			v-bind:pause=pause
			v-bind:stop=stop
			v-bind:resume=resume
			v-bind:reset=reset>
		</c-time-control>		


		<c-time-options
			v-bind:setTimer=setTimer
			v-bind:attrs=attrs.timers
			class="colour-text-light">
		</c-time-options>


		<div class="board z-inverse">

			<div class="container">

				<c-time-numbers
					class="item item-numbers"
					v-bind:start=app.timer
					v-bind:input=app.time>		
				</c-time-numbers>


				<c-time-control-visual
					class="item item-control">
				</c-time-control-visual>

			</div>

		</div>


		<div 
			class="board z-above"
			v-bind:style=getRevealHeight>

			<div class="container">

				<c-time-numbers
					class="item item-numbers"
					v-bind:start=app.timer
					v-bind:input=app.time
					></c-time-numbers>
		

				<c-time-control-visual
					class="item item-control">
				</c-time-control-visual>

			</div>

		</div>

	</div>	

</template>

<script>
// @ is an alias to /src
import TimeNumbers from '@/components/c_time_numbers.vue';
import TimeControl from '@/components/c_time_control.vue';
import TimeControlVisual from '@/components/c_time_control_visual.vue';
import TimeOptions from '@/components/c_time_options.vue';

import { timer } from '../mixins/m_timer.js';


export default {
	name: 'home',
	mixins: [ timer ],
	data(){
		return {

			app : {
				time : 0,
				timer : 0,
			},

			attrs : {
				timers :{
					short : .5*60,
					long : 20*60,
					tickChange : 3,
				},
				reveal : {
					lastUpdate : 0,
					incrementVar : .01,						
				},
			},
		}
	},

	computed : {
		getRevealHeight : function(){
			let heightVar = (this.app.time / this.app.timer) * (1 + this.attrs.reveal.incrementVar);
			let diff = Math.abs( heightVar - this.attrs.reveal.lastUpdate );

			if( diff >= this.attrs.reveal.incrementVar ){
				this.attrs.reveal.lastUpdate = heightVar;
			}	

			if( this.attrs.reveal.lastUpdate > 1 ){
				this.attrs.reveal.lastUpdate = 1;
			}

			return { 'height' : (this.attrs.reveal.lastUpdate * 100) + 'vh' };
		},
	},

	methods : {

		setTimer : function( input ){
			this.app.timer = input;
			this.app.time = 0;
		},
		getTimer : function(){
			return this.app.timer;
		},

		setTime : function( input ){
			this.app.time = input;
			// check if finished
			if( this.app.time === this.app.timer ){
				this.$root.$emit('mode_set', 'finished');
			}
		},
		getTime : function(){
			return this.app.time;
		},



		play : function(){
			this.setTime(0);
			this.timer_setup( 0, this.getTimer(), this.setTime );
			this.timer_start();
		},
		pause : function(){
			this.timer_stop();
		},		
		resume : function(){
			this.timer_start();
		},
		stop : function(){
			this.timer_stop();
		},
		reset : function(){
			this.timer_clear();
			this.setTime(0);
		},

	

	},
	mounted(){

	},
	components: {
		'c-time-numbers' : TimeNumbers,
		'c-time-options' : TimeOptions,
		'c-time-control' : TimeControl,
		'c-time-control-visual' : TimeControlVisual,
	},
}
</script>

<style scoped>
	
/*	.button {
		background-color: var( --colour-bg );
		min-width: unset;
		padding: .1rem .5rem;
		border-radius: 1rem;
	}*/

	.board {
		position: absolute;
		height: 100vh;
		width: 100vw;
		transition: .5s;
		overflow: hidden;
	}

	.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
		background-color: var( --colour-bg );
	}

	.z-inverse .container {
		z-index: 0;
		background-color: var( --colour-bg-inv );
	}

	.item-numbers {
		flex-grow: 1;
	}
	.item-control {
		flex-grow: 1;
	}
/*	.item-buttons {
		margin: 0;
		padding: 0;
	}	*/

	.item {
		width: 15rem;
		margin: auto;
	}

</style>
