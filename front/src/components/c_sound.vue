<template>
</template>

<script>

// todo : file from : https://freesound.org/s/122682/ attribute with cc license ..
import SoundFile from '@/assets/sounds/122682_649468-lq.mp3';


export default {
	name: 'cSound',
	data(){
		return {
			sound : true,
			audio_file : null,
		}
	},
	computed : {
		getSound : function(){
			return this.sound;
		},
	},
	methods : {

		sound_set : function( input ){
			this.sound = input;
		},			
		sound_play : function(){
			if( this.sound ){
				this.audio_file.play();
			}
		},
	},
	mounted(){
		this.audio_file = new Audio( require('@/assets/sounds/122682_649468-lq.mp3'));

		this.$root.$on('sound-set', this.sound_set );
		this.$root.$on('sound-play', this.sound_play );

		// we should locally remember if user sets sound off or on in a pref file ...		
		// this.sound = false;
	},
}
</script>

<style>
</style>
