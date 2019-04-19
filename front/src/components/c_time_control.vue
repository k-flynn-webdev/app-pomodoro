<template>

	<div class="" style="position:absolute;top:1rem;width:100%;height:1rem;z-index:10;">
		
		<p class="text" style="color:blue;display:block;">
			past : {{ mode_past }}
		</p>
		<p class="text" style="color:blue;display:block;">
			now : {{ mode }}
		</p>

	</div>

</template>

<script>

export default {
	name: 'cTimeControl',
	data(){
		return {
			mode : '',
			mode_past : '',
		}
	},

	props : {
		play : Function,
		pause : Function,
		stop : Function,
		resume : Function,
		reset : Function,
		finished : Function,
	},

	methods : {

		init : function(){
			this.mode_set('stop');
		},

		mode_set : function( input ){
			
			if( this.mode !== input ){
				this.mode_past = this.mode;	
				this.mode = input;
			}

			switch( input ){

				case 'play':
					this.$root.$emit('mode_display', 'play', this.mode_past );
					this.play();
					break;
				case 'pause':
					this.$root.$emit('mode_display', 'pause', this.mode_past );
					this.pause();
					break;
				case 'resume':
					this.$root.$emit('mode_display', 'resume', this.mode_past );
					this.resume();
					break;
				case 'stop':
					this.$root.$emit('mode_display', 'stop', this.mode_past );
					this.stop();
					break;
				case 'reset':
					this.$root.$emit('mode_display', 'reset', this.mode_past );	
					this.reset();				
					break;
				case 'finished':
					this.$root.$emit('mode_display', 'finished', this.mode_past );	
					// todo alert user timer is up then reset 
					this.reset();				
					break;

				default : 
			}
		},								
	},

	mounted(){
		this.$root.$on('mode_set', this.mode_set);
		let self = this;
		setTimeout( self.init, 100);
	},	

}

</script>

<style>
</style>

