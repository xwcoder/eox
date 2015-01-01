module.exports = {
    escapeXss: function ( s ) {
        return ( s || '' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
    }
};
