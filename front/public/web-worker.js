let timerObj = null;

onmessage = function( e ) {

	console.log('bg worker:');

	if( !e.data[0] ){
		clearTimeout(timerObj);
		console.log('bg worker cleared.');
	}

	if( e.data[1] ){
		timerObj = setTimeout( function(){
			console.log( 'bg worker finished. calling done.' );
			postMessage( true );
		}, e.data[1] * 1000);
		console.log('bg worker started.');
	}

}