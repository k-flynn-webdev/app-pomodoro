<template>

	<div 
		class="switch"
		v-on:click=next_Scheme>
		<p></p>
		{{ this.scheme }}
	</div>

</template>

<script>
export default {
	name: 'cAppVersion',
	data(){
		return { 
			scheme : 0,
			schemes : [ 'light', 'dark', 'blue' ],
		}
	},
	methods : {
		next_Scheme : function(){
			this.scheme +=1;
			this.scheme = (this.scheme % this.schemes.length);
		},
	},
	mounted(){
		// TODO read user profile for prefs colour scheme?
	},
}
</script>

<style>

	.switch {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;

		width: 0;
		height: 0;
		border-bottom: 100px solid red;
		border-right: 100px solid transparent;
	}


</style>
