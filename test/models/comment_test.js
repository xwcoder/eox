require( 'test' ).setup();

var Comment = require( '../../models/comment' );

describe( 'model.Comment insert', function () {

    it( 'valid column', function () {
        var c = new Comment( {
            id: 123
        } );

        assert.throws( function () {
            c.insert();
        } );        

        c = new Comment();

        assert.throws( function () {
            c.insert();
        } );        
        
    } );

    it( 'ok', function () {
        var c = new Comment( {
            blogId: 16,
            userId: 1,
            userName: 'creep',
            content: 'comment1 <script>alert( 1 )</script>'
        } );

        assert.doesNotThrow( function () {
            c.insert();
        } );
    } );

} );

describe( 'model.Comment getByBlogId', function () {
    it( 'empty', function () {
        assert.equal( Comment.getByBlogId( 100 ).length, 0 );
    } );

    it( 'empty', function () {
        assert.greaterThan( Comment.getByBlogId( 1 ).length, 0 );
    } );
} );

require( 'test' ).run( console.DEBUG );
