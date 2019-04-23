

// function move_towards(a, b){
// 	let diff = b - a;
// 	if( diff > 0){ return a + attrs.time_change; }
// 	if( diff < 0){ return a - attrs.time_change; }
// 	return b;
// }


// let timerInternal = null;

// let attrs = { 
// 	time_ms : 995,
// 	time_change : 1
// }

// let timerObj = {
// 	current : 0,
// 	goal : '',
// }

onmessage = function(e){
	// let timeNowS = Math.floor(Date.now() / 1000);
	setTimeout( function(){
		console.log('Worker: Posting message back to main script');
		postMessage( 'time now complete.' );
	}, e.goal );
	// e.current = move_towards(e.goal,e.current);
	// postMessage(e);
}
