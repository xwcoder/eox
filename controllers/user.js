var http = require( 'http' );
var mq = require( 'mq' );

module.exports = new http.Handler( new mq.Routing( {
    '^/login/(.*)': function ( r ) {
        var res = r.response;
        console.log( r );
        res.write( 'blog view 5...' );
    },
    '^/regist/(.*)': function ( r ) {
        var res = r.response;
        console.log( r );
        res.write( 'blog view 5...' );
    },
    '^(.*)$': function ( r ) {
        var res = r.response;
        res.write( 'blog all...' );
    }
} ) );
