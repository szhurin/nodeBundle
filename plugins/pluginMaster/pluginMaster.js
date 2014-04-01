var fileMaster = require('./fileMaster.js');
exports.name = "plugins/pluginMaster";

// `exports.attach` gets called by broadway on `app.use`
exports.attach = function (options) {

    var getExt = options.getExt || undefined;
    this.__plugins = {};
    this.__plugins.getFiles = function (dir , extensions, getExt) {
        return fileMaster.getFiles(dir, extensions, getExt);  
       
    };
};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {
    //console.log('pluginMaster Init');
  // This plugin doesn't require any initialization step.
  return done();

};