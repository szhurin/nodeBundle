//route test , test_route

module.exports = function(){
    return{
        name: '__basic',

        attach : function (options) {
            //console.log('attach hellou');
            var di_cont = this;        
        },

        detach : function (options) {},

        init : function (done) {

            //console.log('init index hellou');
            // This plugin doesn't require any initialization step.
            return done();
        },

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