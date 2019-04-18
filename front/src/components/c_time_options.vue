<template>

	<div class="center-force item-buttons">
		
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


</template>

<script>


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
	name: 'cTimeOptions',
	data(){
		return {
		}
	},
	props : {
		setTimer : Function,
		getTimer : Function,
		attrs : Object,
	},
	methods : {
		short : function(){
			let beforeTime = move_towards( this.attrs.short, this.attrs.long, 4 );
			this.setTimer( beforeTime );

			let input = {
					attrs : {
						timeMS : 850,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.short,
				current : this.getTimer(),
			};
			ticker( input );
		},
		long : function(){
			let beforeTime = move_towards( this.attrs.long, this.attrs.short, -4 );
			this.setTimer( beforeTime );

			let input = {
					attrs : {
						timeMS : 850,
						change : 1,
					},
				toUpdate : this.setTimer,
				goal : this.attrs.long,
				current : this.getTimer(),
			};
			ticker( input );
		},	
	},
	mounted(){
		this.long();
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

	.item-buttons {
		margin: 0;
		padding: 0;
	}

</style>
