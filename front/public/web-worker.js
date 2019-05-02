let timerObj = null;

onmessage = function( e ) {

	if( !e.data[0] ){
		clearTimeout(timerObj);
	}

	if( e.data[1] ){
		timerObj = setTimeout( function(){
			postMessage( true );
		}, e.data[1] * 1000);
	}

}