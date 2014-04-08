var nb = require('./plugins/nodeBundle');


var attach = function(bundleDirs , options, root){
    root = root || require('path').dirname(require.main.filename) +'/';
    
    options = options || {};
    options['bundleDirs'] = bundleDirs;
    options['pluginDir'] = 'plugins';
    options['root'] = root;
    options['pluginRoot'] = __dirname+'/';
    
    nb.attach(options);
    nb.init();
};

var getDI = function(){return nb.getDI();};


module.exports.attach = attach;
module.exports.getDI = getDI;
module.exports.DI = getDI();

module.exports.basicBundleBuilder = nb.basicBundleBuilder;
