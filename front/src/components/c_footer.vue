<template>

	<footer 
		class="anim-6 colour-bg-inv"
		v-bind:class="{ 'is-active' : display }"> 

		<div 
			class="footer-content center-auto-h width-85 anim-6"
			v-bind:class="{ 'is-active' : inner }">


			<div class="title text-small text-center">
				<p class="colour-fill-bg">Made with 

					<span>

						<svg 
							class="icon" 
							viewBox="0 0 907 828" 
							version="1.1" 
							xmlns="http://www.w3.org/2000/svg" 
							xmlns:xlink="http://www.w3.org/1999/xlink" 
							xml:space="preserve" 
							xmlns:serif="http://www.serif.com/">

							<path class="" d="M730.084,312.85c4.226,113.133 -40.828,236.381 -79.883,320.702c-29.137,63.033 -92.165,103.467 -161.607,103.675c-58.148,0.184 -129.832,0.398 -188.066,0.573c-68.886,0.206 -131.752,-39.215 -161.569,-101.314c-43.597,-90.793 -96.522,-224.663 -88.059,-325.713"/>
							<path class="" d="M710,410.13l137.329,0c0,0 27.947,188.444 -226.001,233.406"/>

						</svg>

					</span> 
					by 

					<a class="colour-fill-accent" target="_blank" title="Github" rel="noopener" href="https://github.com/k-flynn-webdev"> k-flynn-webdev </a>

				</p>
			</div>

		</div>

	</footer>

</template>

<script>

export default {
	name: 'cFooter',
	data(){
		return {
			display : false,
			inner : false,
			times : {
				in : 50,
				mid : 5*1000,
				out : 400,
			},
		}
	},	
	methods : {
		showFooter : function(){
			let self = this;

			if( !self.display ){
				setTimeout( function(){
					self.display = true;
				}, self.times.in );

				setTimeout( function(){
					self.inner = true;
				}, self.times.out );

				setTimeout( function(){
					self.hideFooter();
				}, self.times.mid );
			}
		},
		hideFooter : function(){
			let self = this;

			if( self.display ){
				setTimeout( function(){
					self.inner = false;
				}, self.times.in );

				setTimeout( function(){
					self.display = false;
				}, self.times.out );
			}
		},
	},
	mounted(){
		this.$root.$on('footer-show', this.showFooter );
		this.$root.$on('footer-hide', this.hideFooter );
	},
	beforeDestroy(){
		this.$root.$off('footer-show' );
		this.$root.$off('footer-hide' );
	},
}

</script>

<style scoped >

	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1;
		overflow: hidden;
		opacity: 0;
		pointer-events: none;
	}
	footer.is-active{
		opacity: 1;
	}


	.footer-content {
		pointer-events: visible;
		opacity: 0;
		transform: translateY(4rem);
	}
	.footer-content.is-active {
		transform: translateY(0);
		opacity: 1;
	}


	.footer-content div{
		margin: .25rem;
	}
	.icon {
		transform: translateY(0) scale(1.5);
		width: 2rem;
	}

</style>

