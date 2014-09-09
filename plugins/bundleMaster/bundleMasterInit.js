var _ = require("lodash");
var errorHandle = require('../errorMaster');

var returnVal = {err: false};

module.exports = {

    checkImportExport: function(service, bExitOnError){

        var incs = service.deps.imports;
        var exps = service.deps.exports;

        var diff = _.difference(incs, exps);


        if(diff.length >0){

            var returnVal =  errorHandle.getInitErrorData(diff, service);
            if(bExitOnError){
                errorHandle.errorOnInit(returnVal);
            }else{
                return returnVal;
            }
        }
        return returnVal;
    },

    checkCyclics: function(service, bExitOnError){
        var cyclic = require('./cyclicMaster.js');

        var dependCycle = cyclic.calculateCyclic(service );

        if(dependCycle !== false){

            if(dependCycle.length === 0 ){
                returnVal = {   err: 'No dependancies are registered:',
                            errorData: dependCycle
                        };
            }else{
                returnVal = {   err: 'Detected CYCLIC dependancies. Services in cycle:',
                            errorData: dependCycle
                        };
            }



            if(bExitOnError){
                errorHandle.errorOnInit(returnVal);

            }else{
                return returnVal;
            }
        }
        return returnVal;
    }

};

