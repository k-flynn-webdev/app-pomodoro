<template>
	
	<div ref="parent">
	
		<footer ref="footer">

			<div class="dark footer">	

				<div class="center-auto-h width-85">
					
					<div class="content text-center">
						<p class="text-light">Made with 

							<span>

								<svg class="" height="100%" viewBox="0 0 907 828" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M730.084,312.85c4.226,113.133 -40.828,236.381 -79.883,320.702c-29.137,63.033 -92.165,103.467 -161.607,103.675c-58.148,0.184 -129.832,0.398 -188.066,0.573c-68.886,0.206 -131.752,-39.215 -161.569,-101.314c-43.597,-90.793 -96.522,-224.663 -88.059,-325.713" style="fill:none;stroke-width:100px;"/><path d="M83.339,352.99l634.919,-1.948" style="fill:none;stroke-width:75px;"/><path d="M244.11,87.064l-54.656,150.983" style="fill:none;stroke-width:75px;"/><path d="M463.777,37.5l-79.086,206.267" style="fill:none;stroke-width:75px;"/><path d="M618.892,124.663l-49.707,118.199" style="fill:none;stroke-width:75px;"/><path d="M730.433,429.13l137.329,0c0,0 27.947,188.444 -226.001,233.406" style="fill:none;stroke-width:75px;"/><path d="M103.65,802.194l606.437,0" style="fill:none;stroke-width:50px;"/></svg>

							</span> 
							by 

							<a class="" href="https://github.com/k-flynn-webdev"> k-flynn-webdev </a>

						</p>
					</div>

				</div>

			</div>

		</footer>	

	</div>

</template>

<script>

export default {
	name: 'cFooter',
	mounted(){
		document.body.appendChild( this.$refs.footer );
	},
	beforeDestroy(){
		document.body.removeChild( this.$refs.footer );	
		this.$refs.parent.appendChild( this.$refs.footer );
	},
}

</script>

<style scoped >

	footer { 
		margin-top: auto;
		align-self: flex-end;
		width: 100%;
	}
	.footer {
	}
	.footer .content {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.footer .content svg {
		margin: 0 0.1rem;
		height: 1rem;
	}
	.footer .content svg path{
	}
</style>

