<template>

	<div 
		class="sound anim-3">

		<button
			class="button ic"
			v-bind:class="{ 'is-active' : getDisplay }"
			v-on:click=sound_toggle>

			<svg
				class="icon anim-3"
				height="100%" 
				viewBox="0 0 224 224" 
				version="1.1" 
				xmlns="http://www.w3.org/2000/svg" 
				xmlns:xlink="http://www.w3.org/1999/xlink" 
				xml:space="preserve" 
				xmlns:serif="http://www.serif.com/">

				<path d="M112.206,0.28c61.57,0 111.557,49.987 111.557,111.557c0,61.571 -49.987,111.558 -111.557,111.558c-61.571,0 -111.558,-49.987 -111.558,-111.558c0,-61.57 49.987,-111.557 111.558,-111.557Zm0,140.131c9.607,0 17.407,7.8 17.407,17.408c0,9.607 -7.8,17.408 -17.407,17.408c-9.608,0 -17.408,-7.801 -17.408,-17.408c0,-9.608 7.8,-17.408 17.408,-17.408Zm27.5,-77.21c-17.436,-19.333 -37.564,-19.333 -55,0c-17.436,19.333 -24.808,69.08 -24.808,69.08l104.615,0c0,0 -7.371,-49.747 -24.807,-69.08Z"/>

			</svg>

		</button>

	</div>

</template>

<script>

export default {
	name: 'cSound',
	data(){
		return {
			display : true,
		}
	},
	computed : {
		getDisplay : function(){
			return this.display;
		},
	},
	methods : {

		sound_toggle : function(){
			this.$root.$emit('sound-set', !this.display );
		},
		sound_set : function( input ){
			this.display = input;
		},			

	},
	mounted(){
		this.$root.$on('sound-set', this.sound_set );
	},
}
</script>

<style scoped>

	.sound{
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}

	button {
		min-width: unset;
		background-color: unset;

	}

	.controllers {
		width: 100%;
	}

	.z-inverse .icon {
		color: var( --colour-bg );
		fill: var( --colour-bg );
	}

	.icon {
		color: var( --colour-bg-inv );
		fill: var( --colour-bg-inv );
	}

	.icon {
		opacity: 0.75;
	}
	.is-active .icon {
		opacity: 1;
		color: var( --colour-accent );
		fill: var( --colour-accent );
	}	






	.ic {
		padding: 0;
		margin: .5rem;
		height: 2.5rem; 
		fill-rule:evenodd;
		clip-rule:evenodd;
		stroke-linejoin:round;
		stroke-miterlimit:1.4;
		opacity: 1;
		transition: .5s;
	}


</style>
