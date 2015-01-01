var util = require( 'util' );
var appUtil = require( '../lib/util' );
var getConn = require( './db' );

function Post ( post ) {

    post = post || {};

    util.extend( this, post );
}

util.extend( Post.prototype, {
 
    insert: function () {
        
        if ( !util.isNullOrUndefined( this.id ) ) {
            //TODO
            throw new Error( 'id is not null' );
        }

        if ( !util.isString( this.name ) ||
            !util.isString( this.summary ) ||
            !util.isString( this.content ) ||
            !util.isNumber( this.userId ) ||
            !util.isString( this.userName ) ) {
                throw new Error( 'column is invalid type' );
        }
        
        this.name = this.name.trim();
        this.summary = this.summary.trim();
        this.content = this.content.trim();

        if ( !this.name || !this.summary || !this.content ) {
            throw new Error( 'column is empty' );
        }

        this.name = appUtil.escapeXss( this.name );
        this.summary = appUtil.escapeXss( this.summary );
        this.content = appUtil.escapeXss( this.content );

        var conn = getConn();

        var sql = 'insert into posts' +
                '( name, summary, content, user_id, user_name, user_image, created_at )' +
                ' values (?, ?, ?, ?, ?, ?, ?) ';

        conn.execute( sql, this.name, this.summary, this.content,
                this.userId, this.userName, this.userImage || '', new Date().getTime() );
    },

    update: function () {
    
    }

} );

util.extend( Post, {

    selectSql: 'select id, user_id, user_name, user_image, name, summary, content, created_at from posts ',

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

    convertToPost: function ( item ) {
    
        if ( !item ) {
            return null;
        }

        return new Post( {
            id: item[ 0 ],
            userId: item[ 1 ],
            userName: item[ 2 ],
            userImage: item[ 3 ],
            name: item[ 4 ],
            summary: item[ 5 ],
            content: item[ 6 ],
            createdAt: item[ 7 ]
        } );
    },

    getById: function ( id ) {
    
        if ( !util.isNumber( id ) ) {
            throw new Error( 'id must be number' );
        }

        var conn = getConn();
        var sql = this.selectSql + 'where id=?';
        var list = conn.execute( sql, id );

        var post = null;

        if ( list && list.length ) {
            post = this.convertToPost( list[ 0 ] );
        }

        return post;
    },

    getByUserId: function ( userId, page, size ) {
        var limit = this.getPageSql( page || 0, size || 10 ); 
        var sql = this.selectSql + ' where user_id=? ' + this.orderSql + limit;

        var conn = getConn();
        var dbList = conn.execute( sql, userId );
        
        var list = [];

        if ( dbList && dbList.length ) {
            dbList.forEach( function ( item, index ) {
                list[ index ] = this.convertToPost( item );
            }.bind( this ) );
        }
        return list;
    },

    getByPage: function ( page, size ) {
        var limit = this.getPageSql( page || 0, size || 10 ); 
        var sql = this.selectSql + this.orderSql + limit;

        var conn = getConn();
        var dbList = conn.execute( sql );
        
        var list = [];

        if ( dbList && dbList.length ) {
            dbList.forEach( function ( item, index ) {
                list[ index ] = this.convertToPost( item );
            }.bind( this ) );
        }
        return list;
    }

} );

module.exports = Post;
