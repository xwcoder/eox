require( 'test' ).setup();

var User = require( '../../models/user' );

describe( 'model User insert', function () {

    it( 'insert', function () {

        var user = new User( {
            name: 'user1',
            password: '132123',
            email: 'user1@gmail.com'
        } );

        var user1 = new User( {
            name: 'user2',
            password: 'user2',
            email: 'user2@gmail.com'
        } );
        
        assert.doesNotThrow( function () {
            try {
                user.insert();
                user1.insert();
            } catch ( e ) {
                throw new Error( 'first' );
            }
        } );

        assert.throws( function () {
            try {
                user.insert();
            } catch ( e ) {
                throw new Error( 'email 重复' );
            }
        } );
    } );

    it( 'insert valid column', function () {
        var user = new User();
        assert.throws( function () {
            try {
                user.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );

        user.id = 123;
        assert.throws( function () {
            try {
                user.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );

        user = new User( {
            name: 'user1'
        } );

        assert.throws( function () {
            try {
                user.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );

        user.password = '123';
        assert.throws( function () {
            try {
                user.insert();
            } catch ( e ) {
                throw new Error( 'valid column' );
            }
        } );
    } );

} );

xdescribe( 'model User getById', function () {
    it( 'wrong id', function () {
        assert.throws( function () {
            User.getById();
        } );

        assert.throws( function () {
            User.getById( null );
        } );

        assert.throws( function () {
            User.getById( '123' );
        } );
    } );

    it( 'user null', function () {
        assert.equal( User.getById( 1 ), null );
    } );

    it( 'user ok', function () {
        assert.equal( User.getById( 24 ).id, 24 );
    } );
} );

xdescribe( 'model User getByEmail', function () {
    it( 'wrong email', function () {
        assert.throws( function () {
            User.getByEmail();
        } );

        assert.throws( function () {
            User.getByEmail( null );
        } );

        assert.throws( function () {
            User.getByEmail( 123 );
        } );
    } );

    it( 'user null', function () {
        assert.equal( User.getByEmail( 'user1' ), null );
    } );

    it( 'user ok', function () {
        assert.equal( User.getByEmail( 'user1@gmail.com' ).id, 24 );
    } );
} );

require( 'test' ).run( console.DEBUG );
