<template>

	<div>

		<c-time-control
			v-bind:play=play
			v-bind:pause=pause
			v-bind:stop=stop
			v-bind:resume=resume
			v-bind:reset=reset>
		</c-time-control>		

		<div class="board z-inverse">

			<div class="container">

				<c-time-numbers
					class="item item-numbers"
					v-bind:start=app.timer
					v-bind:input=app.time
					></c-time-numbers>

				<div class="center-force item-buttons colour-text-light">
					
					<button 
						class="button"
						v-on:click=long>
						<p class="text">
							Long
						</p>
					</button>

					<div style="width:1rem;height:1rem;"></div>

					<button 
						class="button"
						v-on:click=short>
						<p class="text">
							Short
						</p>
					</button>

				</div>	
				
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

				<div class="center-force item-buttons colour-text-light">
					
					<button 
						class="button"
						v-on:click=long>
						<p class="text">
							Long
						</p>
					</button>

					<div style="width:1rem;height:1rem;"></div>

					<button 
						class="button"
						v-on:click=short>
						<p class="text">
							Short
						</p>
					</button>

				</div>		

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

import { timer } from '../mixins/m_timer.js';


function ticker( input ){
	input.current = move_towards( input.current, input.goal, input.attrs.change );
	input.toUpdate( input.current, input.goal );

	let diff = Math.abs(input.goal - input.current);

	if( diff !== 0 ){
		setTimeout( ticker, input.attrs.timeMS, input);
	}
}

function move_towards(a, b, delta){
	let diff = b - a;

	if( Math.abs( diff ) <= delta ){
		return b;
	}
	if( diff > 0){ return a + delta; }
	if( diff < 0){ return a - delta; }
}

function lerp( current, target, change ){
	let diff = target - current;
	let delta = diff * change;

	if( Math.abs(diff) < .1){
		return target;
	}

	return target - ( diff - (diff * change) );
}



export default {
	name: 'home',
	mixins: [ timer ],
	data(){
		return {
			app : {
				time : 0,
				timer : 0,
				mode : '',
				mode_past : '',
			},
			attrs : {

				timers :{
					short : 5*60,
					long : 20*60,
					tickChange : 0.988,
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
		},

		short : function(){
			if( this.app.mode != 'play'){

				this.app.timer = this.attrs.timers.short;
				this.app.timer = move_towards( this.app.timer, this.attrs.timers.long, 3 );

				let input = {
						attrs : {
							timeMS : 800,
							change : 1,
						},
					toUpdate : this.setTimer,
					goal : this.attrs.timers.short,
					current : this.app.timer,
				};
				ticker( input );				
			}
		},
		long : function(){
			if( this.app.mode != 'play'){

				this.app.timer = this.attrs.timers.long;
				this.app.timer = move_towards( this.app.timer, this.attrs.timers.short, 3 );

				let input = {
						attrs : {
							timeMS : 800,
							change : 1,
						},
					toUpdate : this.setTimer,
					goal : this.attrs.timers.long,
					current : this.app.timer,
				};
				ticker( input );
			}
		},


		play : function(){
			// console.log('play');
			this.app.time = 0;
			this.timer_setup( 0, this.app.timer, this.update );
			this.timer_start();
		},
		pause : function(){
			// console.log('paused');
			this.timer_stop();
		},		
		resume : function(){
			// console.log('resume');
			this.timer_start();
		},
		stop : function(){
			// console.log('stop');
			this.timer_stop();
		},
		reset : function(){
			// console.log('reset');
			this.timer_clear();
			this.app.time = 0;
		},

		update : function(a,b){
			this.app.time = a;
		},	

	},
	mounted(){
		this.long();
	},
	components: {
		'c-time-numbers' : TimeNumbers,
		'c-time-control' : TimeControl,
		'c-time-control-visual' : TimeControlVisual,
	},
}
</script>

<style scoped>
	
	.button {
		background-color: var( --colour-bg );
		min-width: unset;
		padding: .1rem .5rem;
		border-radius: 1rem;
	}

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
	.item-buttons {
		margin: 0;
		padding: 0;
	}	

	.item {
		width: 15rem;
		margin: auto;
	}

</style>
