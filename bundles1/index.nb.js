
// var builder = require(nodeBundle).basicBundleBuilder(); 
var root = require('path').dirname(require.main.filename);
var builder = require(root+'/index').basicBundleBuilder();

function attach (options) {
        //console.log('attach hellou');
        var di_cont = this;
        this.hellour = function (world) {
            var tmp = options.delimiter || ".";
            di_cont.hello(' test');
          console.log("Hellou "+ world + tmp);
        };
    };

var basic = builder.init();

basic.set('attach', attach).addExports(['hellour','test']);;

module.exports = basic.getBundle();
