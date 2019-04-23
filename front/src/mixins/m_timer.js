

// function move_towards(a, b){
// 	let diff = b - a;
// 	if( diff > 0){ return a + attrs.time_change; }
// 	if( diff < 0){ return a - attrs.time_change; }
// 	return b;
// }


function tick( input ){

	// check finished?
	let check = check_time_s( input.timeGoal );

	input.current = input.goal - check;

	if( check <= 0){
		console.log('timer finished (s)');
		input.toDone( input.current, input.goal );
	}


	input.toUpdate( input.current, input.goal );

	// keep going?
	if( input.current < input.goal){
		timerInternal = setTimeout( tick, attrs.time_ms, input);
	}
}

function check_time_s( goal_S ){
	let timeIn_S = Date.now() / 1000;
	let diff = Math.floor( goal_S - timeIn_S );
	return diff;
}

let timerInternal = null;
// const workerInternal = null;

let attrs = { 
	time_ms : 995,
	time_change : 1
}

export const timer = {

	data(){
		return {
			vars : {
				timer : {
					current : 0,
					goal : 0,
					timeGoal : '',
					toUpdate : Function,
					toDone : Function,
				},	

			},
		}
	},

	methods : {
		timer_setup : function( current, goal, toUpdate, toDone ){
			this.vars.timer.current = current;
			this.vars.timer.goal = goal;
			this.vars.timer.timeObj = '';
			this.vars.timer.toUpdate = toUpdate;
			this.vars.timer.toDone = toDone;
		},
		timer_start : function(){
			if( this.vars.timer.current !== this.vars.timer.goal ){

				this.timer_stop();
				
				let timeIn_S = Date.now() / 1000;
				this.vars.timer.timeGoal = timeIn_S + this.vars.timer.goal;

				tick( this.vars.timer );
				// workerInternal = new Worker("@/helper/m_timer_worker.js");
				// workerInternal.postMessage( this.vars.timer );
			}
		},
		timer_stop : function(){
			clearTimeout( timerInternal );
			// workerInternal = null;
		},		
		timer_clear : function(){
			this.vars.timer.current = 0;
			this.vars.timer.goal = 0;
			this.vars.timer.toUpdate = null;
			this.timer_stop();
		},

	},
}


