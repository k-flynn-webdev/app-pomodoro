<template>

	<div class="app-version">
		<p 
			class="text text-small colour-minor"
			v-on:click=showInstall>
				Ver : {{ version }}	
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
		showInstall : function(){
			this.$root.$emit('install');
		},
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
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	.app-version .text {
		margin: 1rem;
		padding: 0;
	}

</style>
