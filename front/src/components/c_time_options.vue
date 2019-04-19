<template>

	<div 
		class="center-force item-buttons"
		v-bind:class="{'is-active': getDisplay}">
		
		<button 
			class="button"
			v-bind:class="{'is-selected': isLong}"
			v-on:click=long>
			<p class="text">
				Long
			</p>
		</button>

		<div style="width:1rem;height:1rem;"></div>

		<button 
			class="button"
			v-bind:class="{'is-selected': isShort}"
			v-on:click=short>
			<p class="text">
				Short
			</p>
		</button>

	</div>	


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
			display : false,
			mode : '',
		}
	},
	props : {
		setTimer : Function,
		attrs : Object,
	},
	computed : {
		getDisplay : function(){
			return this.display;
		},
		isShort : function(){
			if( this.mode === 'short'){
				return true;
			}
			return false;
		},
		isLong : function(){
			if( this.mode === 'long'){
				return true;
			}
			return false;
		},				
	},
	methods : {
		mode_display : function( input ){
			 if( input === 'options-on' ){
				this.display = true;
			 } 
			 if( input === 'options-off' ){
				this.display = false;
			 } 
		},
		short : function(){
			
			if( this.mode === 'short' ){
				return;
			}

			clearTimer();

			let beforeTime = move_towards( this.attrs.short, this.attrs.long, this.attrs.tickChange );
			this.setTimer( beforeTime );
			this.mode = 'short';

			let input = {
					attrs : {
						timeMS : 900,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.short,
				current : beforeTime,
			};
			ticker( input );
		},
		long : function(){

			if( this.mode === 'long' ){
				return;
			}

			clearTimer();
			
			let beforeTime = move_towards( this.attrs.long, this.attrs.short, -this.attrs.tickChange );
			this.setTimer( beforeTime );
			this.mode = 'long';

			let input = {
					attrs : {
						timeMS : 900,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.long,
				current : beforeTime,
			};
			ticker( input );
		},	
	},
	mounted(){
		this.long();
		this.$root.$on('mode_display', this.mode_display);
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

	.is-selected.button {
		background-color: var( --colour-accent );
	}

	.item-buttons {
		margin: 0;
		padding: 0;
		z-index: 1;
		pointer-events: none;
		transition: 1s;
		opacity: 0.1;
	}

	.is-active {
		opacity: 1;
		pointer-events: auto;
	}

	.is-selected {

	}



</style>
