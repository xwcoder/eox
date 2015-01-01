var test = require( 'test' );
test.setup();

var mq = require( 'mq' );

var key;
var mes = new mq.Message();

var empty = function () {};
var map = {
    '^/static(/.*)': empty,
    '^/blog(/.*)': empty,
    '^(.*)$': empty
};

for ( var k in map ) {
    ( function ( _k ) {
        map[ k ] = function () {
            key = _k;
        }
    } )( k );
}

var route = new mq.Routing( map );

describe( 'web', function () {

    it( 'static route', function () {

        key = '';
        mes.value = '/static/'
        mq.invoke( route, mes );
        assert.equal( key, '^/static(/.*)' );

        key = '';
        mes.value = '/static/demo'
        mq.invoke( route, mes );
        assert.equal( key, '^/static(/.*)' );

    } );

    it( 'blog route', function () {
        key = '';
        mes.value = '/blog/'
        mq.invoke( route, mes );
        assert.equal( key, '^/blog(/.*)' );
        

        key = '';
        mes.value = '/blog/view'
        mq.invoke( route, mes );
        assert.equal( key, '^/blog(/.*)' );

        key = '';
        mes.value = '/blog/123'
        mq.invoke( route, mes );
        assert.equal( key, '^/blog(/.*)' );
    } );

    it( 'all route', function () {
        key = '';
        mes.value = '';
        mq.invoke( route, mes );
        assert.equal( key, '^(.*)$' );

        key = '';
        mes.value = '/';
        mq.invoke( route, mes );
        assert.equal( key, '^(.*)$' );

        key = '';
        mes.value = 'abc';
        mq.invoke( route, mes );
        assert.equal( key, '^(.*)$' );

        key = '';
        mes.value = '/efq';
        mq.invoke( route, mes );
        assert.equal( key, '^(.*)$' );
    } );
} );

test.run( console.DEBUG );
