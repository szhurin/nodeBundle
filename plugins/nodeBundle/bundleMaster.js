// plugins registers di.__nbundles. services

var service = {
    exp_list : {},
    imp_list : {},
    rewrites: [],
    reg : [],
    names: {},
    deps : { importList: {},  imports:[], exportList: {},  exports:[] }
};

 var serviceMaster = require('./serviceMaster.js');

// ----------------------------------  EXPORTS  --------------------------------

module.exports.name = "plugins/bundleMaster";

// `exports.attach` gets called by broadway on `app.use`
module.exports.attach = function (options) {
    var di_cont = this; 
    
    di_cont.__nbundles = {
        attach: function (dirs , ext) {  

            //console.log(dirs);
            for(i in dirs){
                serviceMaster.getFileList(di_cont, options, dirs[i], ext);
            }
            service = serviceMaster.populateServiceList(di_cont, options, service);     
        },
        // ----------------------------------
        init : function(bExitOnError){

            bExitOnError = bExitOnError || true;
            var returnVal = {err: false};
            var bundleMasterInit = require('./bundleMasterInit.js');
            
            returnVal = bundleMasterInit.checkImortExport(service, bExitOnError);

            returnVal = bundleMasterInit.checkCyclics(service, bExitOnError);

            di_cont.init(function (err) {
                var errorHandle = require('./errorHandle.js');
                errorHandle.errorOnDiInit(err);
            });

            return returnVal;
        },

        getPluginList: function(){
            return service;
        },

        getPluginsSettings: function(id){
            return serviceMaster.getPluginsSettings(service, id);
        },
        
        getBundlesSettings: function(id){
            
            var settingsList = serviceMaster.getPluginsSettings(service, id);
            if(id !== undefined) { return settingsList;}
            
            var nbList = [];
            
            for(i in settingsList){
                if (!settingsList.hasOwnProperty(i)) continue;
                var set = settingsList[i];
                
                if(set['__nb'] !== undefined ){
                    nbList.push(set['__nb']);
                }
            }
            
            return nbList;
        }
    };
};

// `exports.init` gets called by broadway on `app.init`.
module.exports.init = function (done) {
  // This plugin doesn't require any initialization step.
  return done();
};


