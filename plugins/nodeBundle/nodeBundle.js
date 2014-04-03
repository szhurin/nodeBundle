var broadway = require("broadway");
var path = require('path');

var app = new broadway.App();

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

// `exports.attach` gets called by broadway on `app.use`
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
        
    app.use( require("./bundleMaster"), {init: true, root: root , pluginsPath: pluginDir} );
    
    var attach = app.__nbundles.attach(bundleDirs);
    
    var init = app.__nbundles.init();
    
    if(typeof(done) === 'function'){
        return done();
    }else{
        return;
    }
};

module.exports.getDI = function(){
    return app;
};