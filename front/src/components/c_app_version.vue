<template>

	<div class="app-version ">
		<p class="text colour-text-light">
			App Version : {{ version }}	
		</p>
		

	</div>	


</template>

<script>
export default {
	name: 'cAppVersion',
	data(){
		return {
			version : '0.0',
		}
	},
	methods : {
		getVersion : function(){
			this.version = process.env.VUE_APP_VERSION || '0.0.0';
		},
	},
	mounted(){
		this.getVersion();
	},
}
</script>

<style scoped>
	.app-version {
		position: absolute;
		right: .5rem;
		bottom: 0;
		z-index: 1;
	}
	.app-version .text {
		color: grey;
	}

</style>
