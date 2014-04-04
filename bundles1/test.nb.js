
// var builder = require(nodeBundle).basicBundleBuilder(); 
var root = require('path').dirname(require.main.filename);
var builder = require(root+'/index').basicBundleBuilder();

function attach(options) {
        //console.log('attach hellou');
        this.hellor = function (world) {
            var tmp = options.delimiter || ".";
          console.log("Hello "+ world + tmp);
        };
    };

var basic = builder.init();

basic.set('attach', attach).addExports(['hellor']);;

module.exports = basic.getBundle();


