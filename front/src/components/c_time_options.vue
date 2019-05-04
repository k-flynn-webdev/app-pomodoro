<template>
	
	<transition appear name="slide-fade">

		<div 
			class="item-buttons anim-3">

			<div
				class="inner anim-3"
				v-bind:class="{'is-active': isactive}">
				
				<button 
					class="button colour-bg-inv anim-3"
					v-bind:class="{'colour-accent': iswork, 'border' : !iswork}"
					v-on:click=button_work>
					<p class="text colour-fill-bg">
						work
					</p>
				</button>

				<div style="width:1rem;height:1rem;display: inline-block;"></div>

				<button 
					class="button colour-bg-inv anim-3"
					v-bind:class="{'colour-accent': isbreak, 'border' : !isbreak}"
					v-on:click=button_break>
					<p class="text colour-fill-bg">
						break
					</p>
				</button>

			</div>

		</div>

	</transition>

</template>

<script>

let timerInternal = null;

function clearTimer(){
	clearTimeout( timerInternal );
}	

function ticker( input ){
	input.current = move_towards( input.current, input.goal, input.attrs.change );
	input.toUpdate( input.current, input.goal );

	let diff = Math.abs(input.goal - input.current);

	if( diff !== 0 ){
		timerInternal = setTimeout( ticker, input.attrs.timeMS, input);
	} else {
		clearTimer();
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
	name: 'cTimeOptions',
	data(){
		return {
			active : false,
			mode : '',
		}
	},
	props : {
		setTimer : Function,
		attrs : Object,
	},
	computed : {
		isactive : function(){
			return this.active;
		},
		isbreak : function(){
			if( this.mode === 'break'){
				return true;
			}
			return false;
		},
		iswork : function(){
			if( this.mode === 'work'){
				return true;
			}
			return false;
		},				
	},
	methods : {
		mode_active : function( input ){
			 if( input === 'options-on' ){
				this.active = true;
			 } 
			 if( input === 'options-off' ){
				this.active = false;
			 } 
		},
		button_break : function(){
			
			if( this.mode === 'break' ){
				return;
			}

			clearTimer();

			let beforeTime = move_towards( this.attrs.break, this.attrs.work, this.attrs.tickChange );
			this.setTimer( beforeTime );
			this.mode = 'break';

			let input = {
					attrs : {
						timeMS : 900,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.break,
				current : beforeTime,
			};
			ticker( input );
		},
		button_work : function(){

			if( this.mode === 'work' ){
				return;
			}

			clearTimer();
			
			let beforeTime = move_towards( this.attrs.work, this.attrs.break, -this.attrs.tickChange );
			this.setTimer( beforeTime );
			this.mode = 'work';

			let input = {
					attrs : {
						timeMS : 900,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.work,
				current : beforeTime,
			};
			ticker( input );
		},	
	},
	mounted(){
		this.button_work();
		this.$root.$on('mode_display', this.mode_active);
	},
}
</script>

<style scoped>

	.item-buttons {
		transition-delay: .1s;
		position: absolute;
		margin: .66rem;
		padding: 0;
		z-index: 1;
		pointer-events: none;
	}

	.item-buttons .inner {
		opacity: .1;
	}
	.is-active.inner {
		opacity: 1;
		pointer-events: auto;
	}

	.button {
		min-width: unset;
		padding: .1rem .5rem;
		border-radius: 1rem;
		display: inline-block;
	}


</style>
