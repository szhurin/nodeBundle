var broadway = require("broadway");
var path = require('path');

var di_cont = new broadway.App();

var root;
var moduleRoot;

var bundleDirs;
var plugins;

//var bundleMaster = require('./bundleMaster');

var fixEndingSlash = function(path){if(path[path.length -1] !== '/'){ path +='/'; } return path;};

module.exports.name = "__nodeBundle_main";

// `exports.attach` gets called by broadway on `di_cont.use`
module.exports.attach = function (options) {
    bundleDirs = options.bundleDirs;
    root = fixEndingSlash(options.root);
    pluginRoot = options.pluginRoot || root;
    pluginRoot =  fixEndingSlash(pluginRoot);
    // ---------------------
    pluginDir = options.pluginDir || 'plugins';
    pluginDir = fixEndingSlash(pluginRoot + pluginDir);
    var sMaster = require(pluginDir+'pluginMaster/fileMaster.js');
    // --------------------
    //console.log(options);
    //string
    if(typeof(bundleDirs) === 'string'){
        bundles = [ sMaster.pathNameFix(bundleDirs, root) ];
    }else{   // aray of strings ??? .....
        for(i in bundleDirs){
            var bundleName = bundleDirs[i];
            if(typeof(bundleName) === 'string'){
                bundleName = sMaster.pathNameFix(bundleName, root);
            }
            bundleDirs[i] = bundleName;
        }
    }
};
module.exports.init = function (done) {
    di_cont.use( require("./bundleMaster"), {init: true, root: root , pluginsPath: pluginDir} );
    var attach = di_cont.__nbundles.attach(bundleDirs);
    var init = di_cont.__nbundles.init();
    if(typeof(done) === 'function'){ return done(); }
    else{ return; }
};

module.exports.getDI = function(){
    return di_cont;
};

module.exports.basicBundleBuilder = builder;

function builder(){
    var basicBuilder = require('./basicBundleBuilder');
    return basicBuilder;
};