var Post = require( '../models/post' );
var appUtil = require( '../lib/util' );
var ejs = require( '../lib/ejs' );

function index ( r ) {
    var res = r.response;
    var posts = Post.getByPage();
    
    res.write( ejs.render( 'index.ejs', {
        title: '首页',
        posts: posts
    } ) );
}

module.exports = index;
