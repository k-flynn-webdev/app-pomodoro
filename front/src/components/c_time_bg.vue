<template>

	<div ref="parent">

		<div 
			ref="timer"
			class="timer">
			<div 
				
				class="timer-bg anim-6"
				v-bind:class=getClass
				v-bind:style=getHeight>	
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
			let heightVar = (this.input / this.start) * 100;
			return { 'height' : heightVar + '%' };
		},
		getClass : function(){
			if( this.input <= 1 ){
				return 'timer-bg anim-6 hide';
			}
			if( this.input >= 99 ){
				return 'timer-bg anim-6 hide';
			}
			return 'timer-bg anim-6 ';
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
	}

	.timer-bg {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 0;
		background-color: darkred;
		opacity: 1;
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


</style>

