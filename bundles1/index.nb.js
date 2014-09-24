
// var builder = require(nodeBundle).basicBundleBuilder();
var root = require('path').dirname(require.main.filename);
var builder = require(root+'/index').basicBundleBuilder();

var test;

function attach (options) {
        //console.log('attach hellou');
        var di_cont = this;
        this.h1 = function (world) {
            var tmp = options.delimiter || ".";
            di_cont.hello(' test');
          console.log("Hellou "+ world + tmp);
        };
    };

function init () {
        console.log('init bundles1/index');

    };


var basic = builder.init();

basic
        .set('attach', attach)
        .set('init', init)
        .addExports(['h1','test'])
        .addImports(['hello']);;

module.exports = basic.getBundle();
