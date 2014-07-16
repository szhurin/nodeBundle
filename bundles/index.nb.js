//route test , test_route
var module_name = '_index';

var settings = {
    __bundle_file: __filename,
    __services : {
        __rewrite: true,
        imports: [],
        exports: ['h_index']
    },
    __nb:{}
};

module.exports = {
    name: module_name,

    attach : function (options) {
        //console.log('attach hellou');
        var di_cont = this;
        this.h_index = function (world) {
            var tmp = options.delimiter || ".";
            di_cont.hello(' test');
          console.log("Hellou "+ world + tmp);
        };
    },

    detach : function (options) {
        console.log('detach hellou');
        //other module with the same name is attached
    },

    init : function (done) {

        //console.log('init index hellou');
        // This plugin doesn't require any initialization step.
        return done();
    },

    __settings: settings
};

