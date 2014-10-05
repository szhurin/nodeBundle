var broadway = require("broadway");
//var path = require('path');

var di_cont = new broadway.App();

var root;
var moduleRoot;

var bundleDirs;
var plugins;

var globalOptions;

//var bundleMaster = require('./bundleMaster');

var fixEndingSlash = function(path) {
    if (path[path.length - 1] !== '/') {
        path += '/';
    }
    return path;
};

var name = "__nodeBundle_main";

// init the bundle dirs - just collect all fixed dirs gotten in options

/**
 *   attaches the modules to di container
 *   
 *   @param object options - the name of the directory
 *       {
 *       bundleDirs : 'an array of directories to check for bundles',
 *       root       : 'the roor directory of the nodeBundle module - the directory of index.js'
 *       pluginRoot : root of pluging dirs
 *       pluginDir  : the dir where plugins are
 *       }
 */
function attach(options) {
    // init
    globalOptions = options;
    bundleDirs = options.bundleDirs || [];
    root = fixEndingSlash(options.root);
    pluginRoot = options.pluginRoot || root;
    pluginRoot = fixEndingSlash(pluginRoot);
    pluginDir = options.pluginDir || 'plugins';
    pluginDir = fixEndingSlash(pluginRoot + pluginDir);
    // ---------------------


    var sMaster = require(pluginDir + 'pluginMaster/fileMaster.js');
    // --------------------
    //console.log(options);
    //
    // Add the root dir to the bundle dir names - FIX ALL THE bundleDirs to be able to include
    if (typeof (bundleDirs) === 'string') {
        bundleDirs = [
            sMaster.pathNameFix(bundleDirs, root)
        ];
    } else {   // aray of strings ??? .....
        for (var i in bundleDirs) {
            var bundleName = bundleDirs[i];
            if (typeof (bundleName) === 'string') {
                bundleName = sMaster.pathNameFix(bundleName, root);
            }
            bundleDirs[i] = bundleName;
        }
    }
    //console.log(bundleDirs);
};

//  attach and init all the bundle dirs ()
function init(done) {

    // register bundle master
    di_cont.use(require("../bundleMaster"), {init: true, root: root, pluginsPath: pluginDir});
    // attach all the files with extention ".nb.js"
    var attach = di_cont.___nb.attach(bundleDirs, [
        ".nb.js"
    ], globalOptions);
    // inits all the bundles
    var init = di_cont.___nb.init();
    // if needs to be called the function as all is done
    if (typeof (done) === 'function') {
        return done();
    }
    else {
        return;
    }
};

function getContainer() {
    return di_cont;
};


function builder() {
    var basicBuilder = require('./basicBundleBuilder');
    return basicBuilder;
}


module.exports = {
    basicBundleBuilder: builder,

    init: init,
    attach: attach,
    name: name,

    getContainer: getContainer,
    container: getContainer()
}


