<template>

<!-- 	<div class="" style="position:absolute;top:1rem;width:100%;height:1rem;z-index:10;">
		
		<p class="text" style="color:blue;display:block;">
			past : {{ mode_past }}
		</p>
		<p class="text" style="color:blue;display:block;">
			now : {{ mode }}
		</p>

	</div> -->

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

		mode_set : function( input , attrs){
			
			if( this.mode !== input ){
				this.mode_past = this.mode;	
				this.mode = input;
			}

			switch( input ){

				case 'play':
					console.log('play');
					this.$root.$emit('mode_display', 'play', this.mode_past );
					this.play();
					this.options_off();
					break;
				case 'pause':
					this.$root.$emit('mode_display', 'pause', this.mode_past );			
					this.pause();
					this.options_off();
					break;
				case 'resume':
					this.$root.$emit('mode_display', 'resume', this.mode_past );
					this.resume();
					this.options_off();					
					break;
				case 'stop':
					console.log('stop');
					this.$root.$emit('mode_display', 'stop', this.mode_past );
					this.stop();
					this.options_on();
					break;
				case 'reset':
					console.log('reset');
					this.$root.$emit('mode_display', 'reset', this.mode_past );
					this.reset();
					this.options_on();	
					break;
				case 'finished':
					console.log('finished');
					this.$root.$emit('mode_display', 'finished', this.mode_past );

					// todo alert user timer is up then reset 
					let self = this;
					setTimeout( function(){
						self.$root.$emit('mode_set', 'stop' );
						self.reset();
						self.options_on();
					}, attrs.time_to_hold );

					break;

				default : 
				
			}
		},
		options_on : function(){
			let self = this;
			setTimeout( function(){
				self.$root.$emit('mode_display', 'options-on', this.mode_past );
			}, 500);
		},
		options_off : function(){
			this.$root.$emit('mode_display', 'options-off', this.mode_past );
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

