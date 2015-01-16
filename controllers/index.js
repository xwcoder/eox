var Post = require( '../models/post' );
var appUtil = require( '../lib/util' );
var ejs = require( '../lib/ejs' );

function index ( r ) {
    var res = r.response;
    try {
        var posts = Post.getByPage();
        
        res.write( ejs.render( 'index.ejs', {
            title: '首页',
            posts: posts
        } ) );

    } catch ( e ) {
        res.write( '404' );
    }
}

module.exports = index;
