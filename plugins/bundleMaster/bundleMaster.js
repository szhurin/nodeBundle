// plugins registers di.__nb. services

var serviceReg = {
    exp_list : {},
    imp_list : {},
    rewrites: [],
    reg : [],
    names: {},
    dependencies : { importList: [],  imports:[], exportList: [],  exports:[] }
};

 var serviceMaster = require('../serviceMaster');

// ----------------------------------  EXPORTS  --------------------------------

module.exports.name = "plugins/bundleMaster";

// `exports.attach` gets called by broadway on `app.use`
module.exports.attach = function (options) {
    var di_cont = this;

    di_cont.___nb = {

        //called to attach all the bundles to service registry
        attach: function (dirs , ext, globalOptions) {

            //console.log(dirs);
            var fileList = [];
            for(var i in dirs){
                //console.log(['dir '+i, dirs[i]]);
                fileList = fileList.concat(serviceMaster.getFileList(di_cont, globalOptions, dirs[i], ext));
            }
            serviceReg = serviceMaster.populateServiceReg(di_cont, globalOptions, serviceReg, fileList );
        },
        // ----------------------------------
        //called to init all the bundles to service registry
        init : function(bExitOnError){

            bExitOnError = bExitOnError || true;
            var returnVal = {err: false};
            var bundleMasterInit = require('./bundleMasterInit.js');

            returnVal = bundleMasterInit.checkImportExport(serviceReg, bExitOnError);

            returnVal = bundleMasterInit.checkCyclics(serviceReg, bExitOnError);

            di_cont.init(function (err) {
                var errorHandle = require('../errorMaster');
                errorHandle.errorOnDiInit(err);
            });

            return returnVal;
        },

        getPluginList: function(){
            
            return serviceReg;
        },

        getPluginsSettings: function(id){
            return serviceMaster.getPluginsSettings(serviceReg, id);
        },

        getBundlesSettings: function(id){

            var settingsList = serviceMaster.getPluginsSettings(serviceReg, id);
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


