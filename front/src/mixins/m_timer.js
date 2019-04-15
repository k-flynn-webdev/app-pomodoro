

function move_towards(a, b){
	let diff = b - a;
	if( diff > 0){ return a + attrs.time_change; }
	if( diff < 0){ return a - attrs.time_change; }
	return b;
}

function tick( input ){
	input.current = move_towards( input.current, input.goal );
	input.toUpdate( input.current, input.goal );
	if( input.current < input.goal){
		timerInternal = setTimeout( tick, attrs.time_ms, input);
	}
}



let timerInternal = null;

let attrs = { 
	time_ms : 990,
	time_change : 1 
}

export const timer = {

	data(){
		return {
			vars : {
				timer : {
					current : 0,
					goal : 0,
					toUpdate : Function,				
				},	

			},
		}
	},

	methods : {
		timer_setup : function( current, goal, toUpdate){
			this.vars.timer.current = current;
			this.vars.timer.goal = goal;
			this.vars.timer.toUpdate = toUpdate;
		},
		timer_start : function(){
			if( this.vars.timer.current !== this.vars.timer.goal ){
				this.timer_stop();
				tick( this.vars.timer );
			}
		},
		timer_stop : function(){
			clearTimeout( timerInternal );
		},		
		timer_clear : function(){
			this.vars.timer.current = 0;
			this.vars.timer.goal = 0;
			this.vars.timer.toUpdate = null;
			this.timer_stop();
		},

	},
}


