<template>

	<div ref="parent">

		<div 
			ref="timer"
			class="timer">
			
			<div 
				class="timer-bg"
				v-bind:class=getClass
				v-bind:style=getHeightBar>	
			</div>

			<div 
				class="timer-bg bar-1"
				v-bind:class=getClass
				v-bind:style=getHeightBar1>
			</div>

			<div 
				class="timer-bg bar-2"
				v-bind:class=getClass
				v-bind:style=getHeightBar2>
			</div>

		</div>

	</div>

</template>

<script>

export default {
	name: 'cTimeBG',
	data(){
		return {
			lastUpdate : 0,
			incrementVar : .0075,
			attrs : {
				bar_heights : [.33,2],
			},
		}
	},	
	props : {
		start : Number,
		input : Number,
	},
	computed : {

		getHeight : function(){
			let heightVar = (this.input / this.start) * (1 + this.incrementVar);
			let diff = Math.abs( heightVar - this.lastUpdate );
			this.ticked = false;

			if( diff >= this.incrementVar ){
				this.lastUpdate = heightVar;
			}
			return this.lastUpdate;		
		},
		getHeightBar : function(){
			return { 'transform' : 'scaleY(' + this.getHeight + ')' };
		},
		getHeightBar1 : function(){
			return { 'transform' : 'translateY(-' + this.attrs.bar_heights[0] + 'rem) scaleY(' + this.getHeight + ')' };
		},
		getHeightBar2 : function(){
			return { 'transform' : 'translateY(-' + this.attrs.bar_heights[1] + 'rem) scaleY(' + this.getHeight + ')' };
		},


		getClass : function(){

			let animClass = ' anim-1'

			if( this.start > 120 ){
				animClass = ' anim-3'
			}
			if( this.start > 300 ){
				animClass = ' anim-6'
			}
			if( this.start > 700 ){
				animClass = ' anim-10'
			}

			if( this.input <= 1 ){
				return animClass + ' hide';
			}
			if( this.input >= 99 ){
				return animClass + ' hide';
			}

			return animClass;
		},
	},

	mounted(){
		document.body.appendChild( this.$refs.timer );
	},
	beforeDestroy(){
		document.body.removeChild( this.$refs.timer );	
		this.$refs.parent.appendChild( this.$refs.timer );
	},
	
}

</script>

<style scoped >
	
	.timer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
		overflow: hidden;
	}

	.timer-bg {
		transform-origin: top left;
		transform: scaleY(0);
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: hsla(100,77%,85%,1);
		box-sizing: border-box;
		opacity: 1;
	}

	.timer-bg.bar-1 {
		background-color: hsla(33,77%,77%,1);
	}
	.timer-bg.bar-2 {
		background-color: hsla(0,77%,60%,1);
	}

</style>

