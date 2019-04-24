<template>

	<div class="switch-holder">
		
		<div 
			class="switch colour-bg-inv"
			v-on:click=next_Scheme>

			<div 
				class="icon"
				v-for="(item, index) in schemes">

				<svg			
					class="styles colour-fill-bg"
					height="100%" 
					viewBox="0 0 101 168" 
					version="1.1" 
					xmlns="http://www.w3.org/2000/svg" 
					xmlns:xlink="http://www.w3.org/1999/xlink" 
					xml:space="preserve" 
					xmlns:serif="http://www.serif.com/">

					<path 
						v-if=isSelected(index)
							d="M100.83,117.219c0,27.583 -22.394,49.977 -49.977,49.977c-27.584,0 -49.978,-22.394 -49.978,-49.977l0,-66.86c0,-27.583 22.394,-49.977 49.978,-49.977c27.583,0 49.977,22.394 49.977,49.977l0,66.86Z"/>

					<circle v-else cx="50.196" cy="50.219" r="49.977"/>				
				</svg>

			</div>

		</div>

	</div>

</template>

<script>
export default {
	name: 'cAppVersion',
	data(){
		return { 
			scheme : 0,
			flip : false,
			schemes : [ { 
				base : 'hsl(250,50%,15%)', 
				inv : 'hsla(35,30%,90%,1)', 
				accent : 'hsla(100,50%,50%,1)'},
				{ 
				base : 'hsl(350,50%,15%)', 
				inv : 'hsla(135,30%,90%,1)', 
				accent : 'hsla(100,50%,50%,1)'},
				{ 
				base : 'hsla(300,10%,40%,1)', 
				inv : 'hsla(187,20%,85%,1)',
				accent : 'hsla(100,50%,50%,1)'},
				],
		}
	},
	computed : {
		getNextColour : function(){
			let next = this.scheme + 1;
			next = next % this.schemes.length;
			return { 'background-color' : this.schemes[next].base }
		},
	},
	methods : {
		isSelected : function( index ){
			if( index === this.scheme ){
				return true;
			}
			return false;
		},			
		next_Scheme : function(){

			if( this.flip ){
				this.flip = false;
				this.scheme +=1;
				this.scheme = (this.scheme % this.schemes.length);
			} else {
				this.flip = true;
			}
			this.set_Scheme();  		
		},
		set_Scheme : function(){

			let bStyles = document.documentElement;

			if( !this.flip ){
				bStyles.style.setProperty('--colour', this.schemes[this.scheme].base );
				bStyles.style.setProperty('--colour-inv', this.schemes[this.scheme].inv );
				bStyles.style.setProperty('--colour-accent', this.schemes[this.scheme].accent );
			} else {
				bStyles.style.setProperty('--colour', this.schemes[this.scheme].inv );
				bStyles.style.setProperty('--colour-inv', this.schemes[this.scheme].base );
				bStyles.style.setProperty('--colour-accent', this.schemes[this.scheme].accent );
			} 		
		},		
	},
	mounted(){
		// TODO read user profile for prefs colour scheme?
	},
}
</script>

<style>

	.icon {
		width: 1rem;
		display: inline;
		height: 1rem;
	}

	.switch-holder{
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;	
		width: 10rem;
		height: 7rem;
		overflow: hidden;
	}

	.switch {
		text-align: center;
		width: 100%;
		height: 100%;
		transform: translateX(-50%) translateY(50%) rotate(45deg);
	}

	.styles {
		margin: .1rem .1rem;
		height: 1rem;
	}

</style>
