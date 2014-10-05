var nb = require('./plugins/nodeBundle');

/**
*   initialize the bundle component 
*   
*   @param array bundleDirs - an Array of dir names to register
*   @param array options - an array of options to pass to plugins
*   @params string root - the dir for the root of the node start file
*/
function attach(bundleDirs , options, root){
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

/**
 *  Dependency Injection container proxy
 *
 * @returnes 
 */
function getDI(){return nb.getContainer();};

var basicBundleBuilder = nb.basicBundleBuilder;

function setBasicBundleBuilder(builder){
    basicBundleBuilder = builder;
}
function getBasicBundleBuilder(builder){
    return basicBundleBuilder;
}

// set up exports
module.exports.attach = attach;
module.exports.DI = getDI;
module.exports.getDI = getDI();
module.exports.container = getDI();
module.exports.getContainer = getDI;

module.exports.getBasicBundleBuilder = getBasicBundleBuilder;
module.exports.basicBundleBuilder = basicBundleBuilder;
module.exports.setBasicBundleBuilder = setBasicBundleBuilder();
module.exports.basic = nb.basic;
