var http = require( 'http' );
var vm = require( 'vm' );
var coroutine = require( 'coroutine' );

var config = require( './config.json' );

function new_web () {
    //return new vm.SandBox( {
    //    mq: require( 'mq' ),
    //    http: require( 'http' ),
    //    ejs: require( 'ejs' )
    //} ).require( './web.js' );

    //return new vm.SandBox( {
    //    mq: require( 'mq' ),
    //    http: require( 'http' )
    //}, require ).require( './web.js' );
}

//var server = new http.Server( config.port, new_web() );
//
//( function () {
//    while ( true ) {
//        coroutine.sleep( 1000 );
//        server.handler = new_web();
//    }
//} ).start();
//
//server.run();

var server = new http.Server( config.port, require( './web.js' ) );
server.run();
