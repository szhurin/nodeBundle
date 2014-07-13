var nb = require('./plugins/nodeBundle');


var attach = function(bundleDirs , options, root){
	// get root path of called file if not given as parameter 
    root = root || require('path').dirname(require.main.filename) +'/';
    
    // set up the options object
    options = options || {};
    options['bundleDirs'] = bundleDirs;
    options['pluginDir'] = 'plugins';
    options['root'] = root;
    options['pluginRoot'] = __dirname+'/';
    
    // call attach with parageters
    nb.attach(options);
    // call init;
    nb.init();
};

var getDI = function(){return nb.getDI();};

// set up exports
module.exports.attach = attach;
module.exports.getDI = getDI;
module.exports.DI = getDI();

module.exports.basicBundleBuilder = nb.basicBundleBuilder;
module.exports.basic = nb.basic;
