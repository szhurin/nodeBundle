var broadway = require("broadway");
var path = require('path');

var di_cont = new broadway.App();

var root;
var moduleRoot;

var bundleDirs;   
var plugins;

//var bundleMaster = require('./bundleMaster');

var pathNameFix = function(bundleName, rootDir){
    if(bundleName[bundleName.length -1] !== '/') bundleName +='/';
    return rootDir + bundleName ; 
};

module.exports.name = "__nodeBundle_main";

// `exports.attach` gets called by broadway on `di_cont.use`
module.exports.attach = function (options) {
    bundleDirs = options.bundleDirs;
    root = options.root;
    moduleRoot = options.moduleRoot || root;
    
    //console.log(options);
    //string
    if(typeof(bundleDirs) === 'string'){
        bundles = [ pathNameFix(bundleDirs, root) ];
    }else{   // aray of strings ??? .....
        for(i in bundleDirs){
            var bundleName = bundleDirs[i];
            if(typeof(bundleName) === 'string'){
                bundleName = pathNameFix(bundleName, root);
            }
            bundleDirs[i] = bundleName;
        }
    }
    // ---------------------
    pluginDir = options.pluginDir || 'plugins';
    pluginDir = pathNameFix(pluginDir, moduleRoot);
};
module.exports.init = function (done) {
        
    di_cont.use( require("./bundleMaster"), {init: true, root: root , pluginsPath: pluginDir} );
    
    var attach = di_cont.__nbundles.attach(bundleDirs);
    
    var init = di_cont.__nbundles.init();
    
    if(typeof(done) === 'function'){
        return done();
    }else{
        return;
    }
};

module.exports.getDI = function(){
    return di_cont;
};