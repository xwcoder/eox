var http = require( 'http' );
var mq = require( 'mq' );
var ejs = require( '../lib/ejs' );
var Post = require( '../models/post' );
var Comment = require( '../models/comment' );

module.exports = new http.Handler( new mq.Routing( {
    '^/view/(\\d+)': function ( r ) {
        var res = r.response;
        var id = r.params[ 0 ] / 1;
        var post = Post.getById( id );
        if ( post ) {
            var comments = Comment.getByBlogId( post.id );
            res.write( ejs.render( 'blog.ejs', {
                title: post.name,
                post: post,
                comments: comments
            } ) );
        } else {
            res.write( '404' );
        }
    },
    '^(.*)$': function ( r ) {
        var res = r.response;
        res.write( 'blog all...' );
    }
} ) );
