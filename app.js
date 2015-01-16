var http = require( 'http' );
var vm = require( 'vm' );
var coroutine = require( 'coroutine' );

var config = require( './config.json' );

function new_web () {

    var sandBox = new vm.SandBox( {
    }, function ( mod ) {
        
        function exclude( mod ) {
            return /\/|^web$/.test( mod ) ;
        }

        if ( !exclude( mod ) ) {
            return require( mod );
        }
    } );
    
    return sandBox.require( './web.js' );
}

var server = new http.Server( config.port, new_web() );

( function () {
    while ( true ) {
        coroutine.sleep( 1000 );
        server.handler = new_web();
    }
} ).start();

server.run();

//var server = new http.Server( config.port, require( './web.js' ) );
//server.run();
