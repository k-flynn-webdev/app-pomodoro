<template>

	<div>

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
				
				<c-time-control
					class="item item-control"
					v-bind:play=play
					v-bind:pause=pause
					v-bind:stop=stop
					v-bind:resume=resume
					v-bind:reset=reset>
				</c-time-control>

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

				<c-time-control
					class="item item-control"
					v-bind:play=play
					v-bind:pause=pause
					v-bind:stop=stop
					v-bind:resume=resume
					v-bind:reset=reset>
				</c-time-control>

			</div>

		</div>

	</div>	

</template>

<script>
// @ is an alias to /src
// import TimeBG from '@/components/c_time_bg.vue';
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
				timer : 1*60,
				mode : 'stop',
			},
			attrs : {
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

		long : function(){
			this.app.timer = 20*60;
		},
		short : function(){
			this.app.timer = 5*60;
		},

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
		// 'c-time-bg' : TimeBG,
		'c-time-numbers' : TimeNumbers,
		'c-time-control' : TimeControl,
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
