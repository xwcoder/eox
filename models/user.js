var util = require( 'util' );
var hash = require( 'hash' );
var getConn = require( './db' );
var appUtil = require( '../lib/util' );

function User ( user ) {

    user = user || {};
    util.extend( this, user );
}

util.extend( User.prototype, {

    update: function () {
        //TODO    
    },

    insert: function () {

        if ( !util.isNullOrUndefined( this.id ) ) {
            //TODO
            throw new Error( 'id is not null' );
        }

        if ( !util.isString( this.name ) ||
            !util.isString( this.email ) ||
            !util.isString( this.password ) ) {
                throw new Error( 'column is invalid type' );
        }

        this.name = this.name.trim();
        this.email = this.email.trim();
        this.password = this.password.trim();
        
        this.name = appUtil.escapeXss( this.name );

        if ( !this.name || !this.email || !this.password ) {
            throw new Error( 'column is null' );
        }

        this.password = hash.md5( this.password ).digest().hex();

        if ( this.admin != 1 ) {
            this.admin = 0;
        }
        
        var conn = getConn();

        var sql = 'insert into users' +
                '( name, email, password, admin, image, created_at )' +
                ' values (?, ?, ?, ?, ?, ?) ';

        conn.execute( sql, this.name, this.email, this.password,
                this.admin, this.image || '', new Date().getTime() );
    }
} );

util.extend( User, {

    selectSql: 'select id, name, password, email, admin, image, created_at from users ',

    orderSql: ' order by created_at desc',

    getPageSql: function ( page, size ) {
        var sql = '';
        if ( page > 1 ) {
            sql = ' limit ' + ( page - 1 ) * size + ',' + size;
        } else {
            sql = ' limit 0,' + size;
        }
        return sql;
    },

    convertToUser: function ( item ) {

        if ( !item ) {
            return null;
        }

        return new User( {
            id: item[ 0 ],
            name: item[ 1 ],
            password: item[ 2 ],
            email: item[ 3 ],
            admin: item[ 4 ],
            image: item[ 5 ],
            createdAt: item[ 6 ]
        } );
    },

    getById: function ( id ) {
        if ( !util.isNumber( id ) ) {
            throw new Error( 'id must be number' );
        }

        var conn = getConn();
        var sql = this.selectSql + 'where id=?';
        var list = conn.execute( sql, id );

        var user = null;

        if ( list && list.length ) {
            user = this.convertToUser( list[ 0 ] );
        }

        return user;
    },

    getByEmail: function ( email ) {

        if ( !util.isString( email ) ) {
            throw new Error( 'email must be string' );
        }
        
        email = email.trim();

        if ( !email ) {
            throw new Error( 'email must not be empty' );
        }

        var conn = getConn();
        var sql = this.selectSql + 'where email=?';
        var list = conn.execute( sql, email );

        var user = null;

        if ( list && list.length ) {
            user = this.convertToUser( list[ 0 ] );
        }

        return user;
    },

    getByPage: function () {
        
        var limit = this.getPageSql( page || 0, size || 10 ); 
        var sql = this.selectSql + this.orderSql + limit;

        var conn = getConn();
        var dbList = conn.execute( sql );
        
        var list = [];

        if ( dbList && dbList.length ) {
            dbList.forEach( function ( item, index ) {
                list[ index ] = this.convertToUser( item );
            }.bind( this ) );
        }
        return list;
    }

} );

module.exports = User;
