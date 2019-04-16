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


			<div class="row">

				<p 
					v-if=hasHours 
					class="header hours">
						
						{{ getHours }}
				</p>
				<p 
					v-if=hasMins 
					class="header mins">
						
						{{ getMins }} 
				</p>
				<p 
					v-if=hasSeconds 
					class="header seconds">
						
						{{ getSeconds }}
				</p>
			
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

		hasHours : function(){
			if(this.start > 59*60){
				return true;
			}
			return false;
		},
		hasMins : function(){
			if(this.start > 59){
				return true;
			}			
			return false;
		},
		hasSeconds : function(){
			if(this.start > 0){
				return true;
			}			
			return false;
		},	

		getHours : function(){
			let timeVar = Math.floor( ( (this.start - this.input ) / 3600) % 60);
			return this.pretty_print( timeVar );
		},
		getMins : function(){
			let timeVar = Math.floor( ( (this.start - this.input ) / 60) % 60);
			return this.pretty_print( timeVar );
		},
		getSeconds : function(){
			let timeVar = Math.ceil( (this.start - this.input) % 60 );
			return this.pretty_print( timeVar );
		},				


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

	methods : {
		pretty_print : function( input ){
			if( Math.abs(input) < 10 ){
				return ('0' + input); 
			}
			return input;
		}
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


	.timer .row {
		position: absolute;
		top: 50%;
		width: 100%;
		text-align: center;
	}

	.hours,.mins,.seconds {
		display: inline-block;
		margin: .5rem;
	}

	.hide {
		/*opacity: 0;*/
	}

	/*.timer-tick div{
		animation: anim-timer-ticker 1s;
	}

	
	@keyframes anim-timer-ticker {
		0% {
			transform: translateX(0);
		}		
		100% {
			transform: translateX(100%);
		}
	}*/


</style>

