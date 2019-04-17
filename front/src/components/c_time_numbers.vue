<template>

	<div class="timer">

		<div class="row">

			<c-time-number
				v-if=hasHours
				v-bind:time_values=getHours>
				<template v-slot:default>
					H
				</template>
			</c-time-number>

			<c-time-number
				v-if=hasMins
				v-bind:time_values=getMins>
				<template v-slot:default>
					M
				</template>
			</c-time-number>

			<c-time-number
				v-if=hasSeconds
				v-bind:time_values=getSeconds>
				<template v-slot:default>
					S
				</template>
			</c-time-number>

		</div>

	</div>


</template>

<script>

import TimeNumber from '@/components/c_time_number.vue';


export default {
	name: 'cTimeNumbers',
	data(){
		return {
			lastUpdate : 0,

			time : {
				hrs : ['00', '00', '00', '00' ],
				mns : ['00', '00', '00', '00' ],
				secs : ['00', '00', '00', '00' ],
			},
		}
	},	
	props : {
		start : Number,
		input : Number,
	},
	computed : {

		hasHours : function(){
			if(this.start > 59*60){
				return true;
			}
			return false;
		},
		hasMins : function(){
			if(this.start > 59){
				return true;
			}			
			return false;
		},
		hasSeconds : function(){
			if(this.start > 0){
				return true;
			}			
			return false;
		},	


		getHours : function(){
			let timeVar = Math.floor( ( (this.start - this.input ) / 3600) % 60);
			let pretty = this.pretty_print( timeVar );

			if( this.time.hrs[0] === pretty ){
				return this.time.hrs;
			}

			this.$set(this.time.hrs, 0, pretty);
			this.$set(this.time.hrs, 1, this.pretty_print( timeVar - 1));
			this.$set(this.time.hrs, 2, this.pretty_print( timeVar + 1));
			this.$set(this.time.hrs, 3, this.pretty_print( timeVar + 2));

			return this.time.hrs;
		},
		
		getMins : function(){
			let timeVar = Math.floor( ( (this.start - this.input ) / 60) % 60);
			let pretty = this.pretty_print( timeVar );

			if( this.time.mns[0] === pretty ){
				return this.time.mns;
			}

			this.$set(this.time.mns, 0, pretty );
			this.$set(this.time.mns, 1, this.pretty_print( timeVar - 1));
			this.$set(this.time.mns, 2, this.pretty_print( timeVar + 1));
			this.$set(this.time.mns, 3, this.pretty_print( timeVar + 2));

			return this.time.mns;
		},

		getSeconds : function(){
			let timeVar = Math.ceil( (this.start - this.input) % 60 );
			let pretty = this.pretty_print( timeVar );

			if( this.time.secs[0] === pretty ){
				return this.time.secs;
			}

			this.$set(this.time.secs, 0, pretty );
			this.$set(this.time.secs, 1, this.pretty_print( timeVar - 1));
			this.$set(this.time.secs, 2, this.pretty_print( timeVar + 1));
			this.$set(this.time.secs, 3, this.pretty_print( timeVar + 2));

			return this.time.secs;
		},

	},

	methods : {
		pretty_print : function( input ){
			if( input < 0){
				input += 60
			}
			if( Math.abs(input) < 10 ){
				return ('0' + input); 
			}
			return input.toString();
		}
	},

	// mounted(){
	// 	document.body.appendChild( this.$refs.timer );
	// },
	// beforeDestroy(){
	// 	document.body.removeChild( this.$refs.timer );	
	// 	this.$refs.parent.appendChild( this.$refs.timer );
	// },
	components: {
		'c-time-number' : TimeNumber,
	},	
}

</script>

<style scoped >
	
	.timer {
		position: relative;
		pointer-events: none;
	}

	.timer .row {
		position: absolute;
		top: 50%;
		width: 100%;
		text-align: center;
	}


</style>

