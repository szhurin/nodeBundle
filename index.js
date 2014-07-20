var nb = require('./plugins/nodeBundle');

/**
*   initialize the bundle component 
*   
*   @param array bundleDirs - an Array of dir names to register
*   @param array options - an array of options to pass to plugins
*   @params string root - the dir for the root of the node start file
*/
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
