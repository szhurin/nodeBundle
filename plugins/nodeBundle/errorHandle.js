
var errorStdText = '!!!!!!!!!!!   ';

module.exports = {
    errorOnInit:    function(error){
        console.error(errorStdText + error.err);
        console.error(error.errorData);
        process.exit(1);
    },
    
    errorOnRewrite: function(rewrite){
        console.error(errorStdText + 'Rewrite service not allowed');
        console.error(rewrite);
        
        process.exit(1);
    },
    
    errorOnDiInit: function(err){
        if (err) {
            console.error(err);
            process.exit(1);
        }
    },
    
    getInitErrorData: function(diff, service){
        var returnVal = {};
        var err_bundles = [];
        var error_str = '';
        var service_import_list = service.imp_list;
        
          
        for(i in diff){
            if (!diff.hasOwnProperty(i)) continue;
            var service_name = diff[i];

            //if()
            var index = service_import_list[service_name]; // get index of the module

            var obj = service.reg[index];                  // get object fron registry by index
            
            if(obj === undefined) continue;
           // get obj data;
           
            console.log(obj);
           
            var fname = obj.__settings.__bundle_file;
            var bname = obj.name;
            err_bundles.push({service: service_name, bundle_name: bname, file_name: fname});
            error_str += service_name + ' -> '+ fname +'\r\n';
        }
        returnVal.err = 'unmet dependancies are: '+diff.join(',') + '\r\n in files: \r\n'+error_str;
        returnVal.errorData = err_bundles;
        return returnVal;
    },
    
    errorOnBundleOverride: function(name, service, obj){
        var old_fname = service.reg[service.names[name]].__settings.__bundle_file;
        var new_fname = obj.__settings.__bundle_file; 
        console.error('!!!!! Overriding module '+name+' in file '+old_fname+' to new file '+ new_fname);
    }
};