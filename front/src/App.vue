
<template>

	<div id="app">

		<c-pwa-notify></c-pwa-notify>

		<nav>

			<h1></h1>
			
			<c-time-options
				v-bind:setTimer=setTimer
				v-bind:attrs=attrs.timers>
			</c-time-options>	

			<c-sound></c-sound>	

		</nav>

		<c-colour-switch></c-colour-switch>	

		<c-time-control
			v-bind:play=play
			v-bind:pause=pause
			v-bind:stop=stop
			v-bind:resume=resume
			v-bind:reset=reset>
		</c-time-control>



		<c-app-version></c-app-version>

		<c-footer></c-footer>



			<div class="board z-inverse">

				<div class="container colour-bg-inv">

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

			<c-div-bg-reveal
				class="board"
				v-bind:progress=app.time
				v-bind:goal=app.timer>

				<div 
					class="container colour-bg-inv"
					v-bind:class="{ 'colour-accent' : app.finished }">

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

			</c-div-bg-reveal>

	</div>

</template>

<script>

// adding global style ..
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');
require('@/assets/style/anim.css');



// @ is an alias to /src

import DivBGReveal from '@/components/c_div_bg_reveal.vue';

import PWANotify from '@/components/c_pwa_notify.vue';
import CSwitch from '@/components/c_colour_switch.vue';
import Sound from '@/components/c_sound.vue';
import SoundVisual from '@/components/c_sound_visual.vue';

import AppVersion from '@/components/c_app_version.vue';
import TimeNumbers from '@/components/c_time_numbers.vue';
import TimeControl from '@/components/c_time_control.vue';
import TimeControlVisual from '@/components/c_time_control_visual.vue';
import TimeOptions from '@/components/c_time_options.vue';
import Footer from '@/components/c_footer.vue';

import { timer } from '@/mixins/m_timer.js';






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
					break : 4.5*60,
					work : 24*60,
					tickChange : 2,
				},

				finish : {
					time_to_hold : 1500,
				},
			},
		}
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
		},
		pause : function(){
			this.timer_stop();
		},		
		resume : function(){
			this.timer_resume();
		},
		stop : function(){
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
	beforeDestroy(){
		this.stop();
	},
	components: {
		'c-div-bg-reveal' : DivBGReveal,
		'c-pwa-notify' : PWANotify,
		'c-colour-switch' : CSwitch,
		'c-sound' : Sound,
		'c-sound-visual' : SoundVisual,
		'c-app-version' : AppVersion,
		'c-time-numbers' : TimeNumbers,
		'c-time-options' : TimeOptions,
		'c-time-control' : TimeControl,
		'c-time-control-visual' : TimeControlVisual,
		'c-footer' : Footer,
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
	}

	.z-inverse .container {
		z-index: 0;
	}

	.item-numbers {
		flex-grow: 1;
		min-width: 45vmin;
	}
	.item-control {
		flex-grow: 0;
		max-width: 60vmin;
	}


	.item {
		margin: auto;
	}

	.item:nth-child(odd) {
		/*background-color: grey;*/
	}
	.item:nth-child(even) {
		/*background-color: purple;*/
	}



	

</style>

