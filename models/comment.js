var util = require( 'util' );
var getConn = require( './db' );
var appUtil = require( '../lib/util' );

function Comment ( comment ) {

    comment = comment || {};
    util.extend( this, comment );
}

util.extend( Comment.prototype, {

    update: function () {
        //TODO    
    },

    insert: function () {

        if ( !util.isNullOrUndefined( this.id ) ) {
            //TODO
            throw new Error( 'id is not null' );
        }

        if ( !util.isString( this.content ) ||
                !util.isNumber( this.userId ) ||
                !util.isNumber( this.blogId ) ||
                !util.isString( this.userName ) ) {
                throw new Error( 'column is invalid type' );
        }

        this.content = appUtil.escapeXss( this.content );

        var conn = getConn();

        var sql = 'insert into comments' +
                '( blog_id, user_id, user_name, user_image, content, created_at )' +
                ' values (?, ?, ?, ?, ?, ?) ';

        try {
        conn.execute( sql, this.blogId, this.userId, this.userName,
                this.userImage || '', this.content, new Date().getTime() );
        } catch ( e ) {
            console.log( e );
        }
    }
} );

util.extend( Comment, {

    selectSql: 'select id, blog_id, user_id, user_name, user_image, content, created_at from comments ',

    orderSql: ' order by created_at desc',

    convertToComment: function ( item ) {

        if ( !item ) {
            return null;
        }

        return new Comment( {
            id: item[ 0 ],
            blogId: item[ 1 ],
            userId: item[ 2 ],
            userName: item[ 3 ],
            userImage: item[ 4 ],
            content: item[ 5 ],
            createdAt: item[ 6 ]
        } );
    },

    getByBlogId: function ( blogId ) {

        if ( !util.isNumber( blogId ) ) {
            throw new Error( 'wrong blog id' );
        }
        var sql = this.selectSql + ' where blog_id=? ' + this.orderSql;

        var conn = getConn();
        var dbList = conn.execute( sql, blogId );
        
        var list = [];

        if ( dbList && dbList.length ) {
            dbList.forEach( function ( item, index ) {
                list[ index ] = this.convertToComment( item );
            }.bind( this ) );
        }
        return list;
    }
} );

module.exports = Comment;
