//route test , test_route
var module_name = '_test';

var settings = {
    __bundle_file: __filename,    
    __services : {
        __rewrite: true,
        imports: ['hellou'],
        exports: ['hello']
    },    
    __nb:{}       
};

module.exports = {
    //name: module_name,
    
    attach : function (options) {
        //console.log('attach hellou');
        this.hello = function (world) {
            var tmp = options.delimiter || ".";
          console.log("Hello "+ world + tmp);
        };
    },
    
    detach : function (options) {
        //other module with the same name is attached
    },

    init : function (done) {
        
        //console.log('init index hellou');
        // This plugin doesn't require any initialization step.
        return done();
    },
      
    __settings: settings
};