var util = require( 'util' );
var path = require( 'path' );
var ejs = require( 'ejs' );
//ejs.open = '{{';
//ejs.close = '}}';

var dir = path.join( path.fullpath( '.' ) + '/views' );
var staticOptions = {
    cache: true
};

module.exports = {

    render: function ( filename, options ) {
        options = util.extend( options || {}, staticOptions );
        return ejs.renderFile( path.join( dir, filename ), options );
    }   
};
