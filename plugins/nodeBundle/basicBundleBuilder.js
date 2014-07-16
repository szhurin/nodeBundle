var _ = require('lodash');


var getCallFileName = require('../utils/gcfn');
var serviceMaster = require('./serviceMaster');

var basicBundle;

function init(modName){
    var fName = getCallFileName();
    var basic = require('../__basicBundles/basic.nb.js');
    basicBundle = basic();
    basicBundle.__settings.__bundle_file = fName;
    basicBundle.name = modName || serviceMaster.getModuleName(fName);
    return module.exports;
}

function addImports(imps){
    basicBundle.__settings.__services.imports = basicBundle.__settings.__services.imports.concat(imps);
    return module.exports;
}
function setImports(imps){
    basicBundle.__settings.__services.imports = imps;
    return module.exports;
}
function addExports(exps){
    basicBundle.__settings.__services.exports = basicBundle.__settings.__services.exports.concat(exps);
    return module.exports;
}
function setExports(exps){
    basicBundle.__settings.__services.exports = exps;
    return module.exports;
}

function addNBSettings(sets){
    basicBundle.__settings.__nb = _.assign(basicBundle.__settings.__nb, sets);
    return module.exports;
}
function setNBSettings(sets){
    basicBundle.__settings.__nb = sets;
    return module.exports;
}
function addRoutes(routes){
    basicBundle.__settings.__nb.__routes = _.assign(basicBundle.__settings.__nb.__routes, routes);
    return module.exports;
}
function setRoutes(routes){
    basicBundle.__settings.__nb.__routes = routes;
    return module.exports;
}

module.exports = {
    init: init,
    set: function(key, val){basicBundle[key] = val; return module.exports;},
    setImports: setImports,
    addImports: addImports,
    setExports: setExports,
    addExports: addExports,
    setNBSettings: setNBSettings,
    addNBSettings: setNBSettings,
    setRoutes: setRoutes,
    addRoutes: addRoutes,
    getBundle: function(){return basicBundle;}
};

