var mq = require( 'mq' );
var http = require( 'http' );

module.exports = new mq.Routing( {
    '^/static(/.*)': http.fileHandler( './static/' ),
    '^/blog(/.*)': require( './controllers/blog' ).handler,
    '^/user(/.*)': require( './controllers/user' ).handler,
    '^/$': require( './controllers/index' ),
    '^(.*)$': function ( r ) {
        var res = r.response;
        res.write( '404' );
    }
} );
