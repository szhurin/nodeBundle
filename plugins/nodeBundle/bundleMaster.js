// plugins registers di.__nbundles. services

var service = {
    exp_list : {},
    imp_list : {},
    rewrites: [],
    reg : [],
    names: {},
    deps : { importList: [],  imports:[], exportList: [],  exports:[] }
};

 var serviceMaster = require('../serviceMaster');

// ----------------------------------  EXPORTS  --------------------------------

module.exports.name = "plugins/bundleMaster";

// `exports.attach` gets called by broadway on `app.use`
module.exports.attach = function (options) {
    var di_cont = this;

    di_cont.__nbundles = {
        attach: function (dirs , ext, globalOptions) {

            //console.log(dirs);
            var fileList = [];
            for(i in dirs){
                //console.log(['dir '+i, dirs[i]]);
                fileList = fileList.concat(serviceMaster.getFileList(di_cont, globalOptions, dirs[i], ext));
            }
            service = serviceMaster.populateServiceList(di_cont, globalOptions, service, fileList );
        },
        // ----------------------------------
        init : function(bExitOnError){

            bExitOnError = bExitOnError || true;
            var returnVal = {err: false};
            var bundleMasterInit = require('./bundleMasterInit.js');

            returnVal = bundleMasterInit.checkImportExport(service, bExitOnError);

            returnVal = bundleMasterInit.checkCyclics(service, bExitOnError);

            di_cont.init(function (err) {
                var errorHandle = require('../errorMaster');
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


