var db = require( 'db' );
var Pool = require( './pool' );

var coroutine = require( 'coroutine' );

var pool = Pool( function () {

    return db.open( 'mysql://creep:123456@localhost/blog' );

}, 5 );

module.exports = function () {
    return pool( function ( v ) { return v } );
}
