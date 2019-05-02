<template>

	<div 
		v-bind:style=getHeightStyle>

		<slot></slot>

	</div>

</template>

<script>
export default {
	name: 'cDivBGReveal',
	data(){
		return {
			reveal : {
				height : 0,
				incrementVar : .01,
			},			
		}
	},
	props : {
		progress : Number,
		goal : Number,
	},
	computed : {

		getProgress : function(){
			this.progress_update();
			return this.reveal.height;
		},
		getHeightStyle : function(){
			return { 'height' : (this.getProgress * 100) + '%' };
		},

	},	
	methods : {
		progress_update : function(){
			let heightVar = (this.progress / this.goal) * (1 + this.reveal.incrementVar);
			let diff = Math.abs( heightVar - this.reveal.height );

			if( diff >= this.reveal.incrementVar ){
				this.reveal.height = heightVar;
			}	

			if( this.reveal.height > 1 ){
				this.reveal.height = 1;
			}
		}
	},
	mounted(){
	},
}
</script>

<style>


</style>
