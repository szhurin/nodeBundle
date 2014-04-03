var nb = require('./plugins/nodeBundle');


var attach = function(bundleDirs , root){
    nb.attach({bundleDirs : bundleDirs, pluginDir: 'plugins', root: root, moduleRoot: __dirname+'/'});
    nb.init();
};

var getDI = function(){return nb.getDI();};


module.exports.attach = attach;
module.exports.getDI = getDI;
module.exports.DI = getDI();
