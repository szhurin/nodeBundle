//basic module structure
module.exports = function(){
    return{
        name: '__basic',

        attach : function (options) {},
        detach : function (options) {},
        init : function (done) { return done(); },

        __settings: {
            __bundle_file: '',
            __services : {
                __rewrite: false,
                imports: [],
                exports: []
            },
            __nb:{
                __routes : {}
            }
        }
    };
};