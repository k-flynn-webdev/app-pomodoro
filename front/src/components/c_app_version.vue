<template>

	<transition appear name="slide-fade">
		<div 
			class="app-version anim-3">
			<p 
				class="text text-small text-bold colour-minor"
				v-on:click=showFooter
				aria-label="version">
					V : {{ version }}	
			</p>
		</div>
	</transition>

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
		showFooter : function(){
			this.$root.$emit('footer-show');
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
		transition-delay: 1.5s;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	.app-version .text {
		margin: .66rem;
		padding: 0;
	}



</style>
