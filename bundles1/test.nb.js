
// var builder = require(nodeBundle).basicBundleBuilder();
var root = require('path').dirname(require.main.filename);
var builder = require(root+'/index').basicBundleBuilder();

function attach(options) {
    //console.log('attach hellou');
    this.h_test = function (world) {
        var tmp = options.delimiter || ".";
      console.log("Hello "+ world + tmp);
    };
}

function init() {console.log('init bundles1/test ');}

var basic = builder.init('test');

basic   .set('attach', attach)
        .set('init', init)
        .addExports(['h_test']);

module.exports = basic.getBundle();
