var timeout = 30 * 60 * 1000; //session过期时间 30m
var cache = {};

module.exports = {

    add: function ( id ) {
        cache[ id ] = new Date().getTime();
    },

    remove: function ( id ) {
        delete cache[ id ];
    },

    isValid: function ( id ) {
        var r = false;

        var timestamp = cache[ id ];

        if ( value ) {
            if ( new Date().getTime - timestamp < timeout ) {
                r = true;
            } else {
                this.remove( id );
            }
        }

        return r;
    }

};
