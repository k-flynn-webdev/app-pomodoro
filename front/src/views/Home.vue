<template>

	<div>

		<c-sound></c-sound>	

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

				<c-sound-visual>
				</c-sound-visual>

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

			<div 
				class="container"
				v-bind:class="{ 'colour-win' : app.finished }">

				<c-sound-visual>
				</c-sound-visual>
				
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

		<c-app-version></c-app-version>

	</div>	

</template>

<script>
// @ is an alias to /src
import Sound from '@/components/c_sound.vue';
import SoundVisual from '@/components/c_sound_visual.vue';

import AppVersion from '@/components/c_app_version.vue';
import TimeNumbers from '@/components/c_time_numbers.vue';
import TimeControl from '@/components/c_time_control.vue';
import TimeControlVisual from '@/components/c_time_control_visual.vue';
import TimeOptions from '@/components/c_time_options.vue';

import { timer } from '@/mixins/m_timer.js';

import NoSleep from 'nosleep.js';
var noSleep = new NoSleep();

function enableNoSleep() {
	console.log('no sleep started.');
	noSleep.enable();
	// document.removeEventListener('touchstart', enableNoSleep, false);
}
function disableNoSleep() {
	// document.removeEventListener('touchstart', enableNoSleep, false);
	console.log('no sleep stopped.');
	noSleep.disable();
}


export default {
	name: 'home',
	mixins: [ timer ],
	data(){
		return {

			app : {
				time : 0,
				timer : 0,
				finished : false,
			},

			attrs : {
				timers :{
					break : 4*60,
					work : 18*60,
					tickChange : 2,
				},
				reveal : {
					lastUpdate : 0,
					incrementVar : .01,						
				},
				finish : {
					time_to_hold : 1500,
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

			return { 'height' : (this.attrs.reveal.lastUpdate * 100) + '%' };
		},
	},

	methods : {

		setTimer : function( input ){
			this.app.time = 0;
			this.app.timer = input;
			this.app.finished = false;
		},
		getTimer : function(){
			return this.app.timer;
		},

		setTime : function( input ){
			this.app.time = input;

			// check if finished
			if( this.app.time >= this.app.timer - 1 ){
				// hide stop button?
				this.$root.$emit('mode_display', 'near');
			}

			if( this.app.time >= this.app.timer ){
				this.finished();
			}
		},
		getTime : function(){
			return this.app.time;
		},


		play : function(){
			this.reset();
			this.timer_setup( 0, this.getTimer(), this.setTime, this.finished );
			this.timer_start();
			enableNoSleep();
		},
		pause : function(){
			this.timer_stop();
		},		
		resume : function(){
			this.timer_start();
		},
		stop : function(){
			disableNoSleep();
			this.reset();
		},
		reset : function(){
			this.timer_clear();
			this.setTime(0);
			this.app.finished = false;
		},
		finished : function(){
			let self = this;
			self.app.time = self.app.timer;
			setTimeout( function(){
				self.app.finished = true;
				self.$root.$emit('mode_set', 'finished', self.attrs.finish );
			}, 900);
		}
	
	},
	mounted(){

	},
	components: {
		'c-sound' : Sound,
		'c-sound-visual' : SoundVisual,
		'c-app-version' : AppVersion,
		'c-time-numbers' : TimeNumbers,
		'c-time-options' : TimeOptions,
		'c-time-control' : TimeControl,
		'c-time-control-visual' : TimeControlVisual,
	},
}
</script>

<style scoped>



	.board {
		position: absolute;
		height: 100%;
		width: 100vw;
		transition: height .3s;
		overflow: hidden;
	}

	.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
		transition: background-color .4s;
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


	.item {
		width: 15rem;
		margin: auto;
	}

</style>
