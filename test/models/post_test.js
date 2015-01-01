require( 'test' ).setup();

var Post = require( '../../models/post' );

xdescribe( 'model Post insert', function () {

    it( 'insert', function () {

        var post1 = new Post( {
            name: 'post1',
            summary: 'post1 summary',
            content: 'post1 content <script>alert(1);</script>',
            userId: 1,
            userName: 'creep'
        } );

        var post2 = new Post( {
            name: 'post2',
            summary: 'post2 summary',
            content: 'post2 content <script>alert(1);</script>',
            userId: 2,
            userName: 'creep2'
        } );
        
        assert.doesNotThrow( function () {
            post1.insert();
            post2.insert();
        } );
    } );

    it( 'insert valid column', function () {
        var post = new Post();
        assert.throws( function () {
            try {
                post.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );

        post.id = 123;
        assert.throws( function () {
            try {
                post.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );

        post = new Post( {
            name: 'post1'
        } );

        assert.throws( function () {
            try {
                post.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );
    } );

} );

xdescribe( 'model Post getById', function () {
    it( 'wrong id', function () {
        assert.throws( function () {
            Post.getById();
        } );

        assert.throws( function () {
            Post.getById( null );
        } );

        assert.throws( function () {
            Post.getById( '123' );
        } );
    } );

    it( 'post null', function () {
        assert.equal( Post.getById( 100 ), null );
    } );

    it( 'post ok', function () {
        assert.equal( Post.getById( 1 ).id, 1 );
        assert.equal( Post.getById( 4 ).id, 4 );
    } );
} );

xdescribe( 'model.Post  getByUserId', function () {

    it( 'user null', function () {
        assert.equal( Post.getByUserId( 4 ).length, 0 );
    } );

    it( 'user ok', function () {
        assert.greaterThan( Post.getByUserId( 1 ).length, 0 );
    } );

    it( 'user ok', function () {
        assert.equal( Post.getByUserId( 1, 1, 2 ).length, 2 );
    } );

    it( 'user ok', function () {
        assert.equal( Post.getByUserId( 1, 2, 2 ).length, 2 );
    } );
} );

describe( 'model.Post  getByPage', function () {

    it( 'user null', function () {
        assert.greaterThan( Post.getByPage().length, 0 );
    } );

    it( 'user ok', function () {
        assert.equal( Post.getByPage( 1, 2 ).length, 2 );
    } );

    it( 'user ok', function () {
        assert.equal( Post.getByPage( 1, 2 ).length, 2 );
    } );

    it( 'user ok', function () {
        assert.equal( Post.getByPage( 2, 2 ).length, 2 );
    } );
} );

require( 'test' ).run( console.DEBUG );
