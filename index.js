var nb = require('./plugins/nodeBundle');

var basic = require('./__bacis/bacis.nb.js');
var basic_helper = require('./__bacis/bacis_helper.nb.js');

var attach = function(bundleDirs , root){
    root = root || require('path').dirname(require.main.filename) +'/';
    nb.attach({bundleDirs : bundleDirs, pluginDir: 'plugins', root: root, pluginRoot: __dirname+'/'});
    nb.init();
};

var getDI = function(){return nb.getDI();};


module.exports.attach = attach;
module.exports.getDI = getDI;
module.exports.DI = getDI();

