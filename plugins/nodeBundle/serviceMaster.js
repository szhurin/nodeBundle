var _ = require("lodash");
var errorHandle = require('./errorHandle.js');

var getDoubleExt = function(fname){
            var tmp = fname.split('.');
            var c = tmp.length;
            return "."+tmp[c-2]+"."+tmp[c-1] ;
        };

var bundleFileList;
var nbPath;
var dbExt; 

//   ----------  EXPORTS  --------------

module.exports = {
    
    getPluginsSettings: function(service, id){
        var reg = service.reg;
        if(id){
            if(reg[id] !== undefined){
                return reg[id].__settings;
            }
        }
        var ret = [];
        for(i in reg){
            if (!reg.hasOwnProperty(i)) continue;
            if(reg[i]['__settings'] !== undefined){
                ret.push(reg[i]['__settings']);
            }            
        }
        return ret;
    },
    
    getFileList:    function(di_cont, options, dir, ext){
        
        var pluginMasterPath = (options.pluginsPath || "../") + "pluginMaster";
    
        //console.log(dir);
    
        di_cont.use(require(pluginMasterPath), {init: true} );
        
        var path = dir || options.root+"routes";
        nbExt = ext || [".nb.js"];  
        
        //bundleFiles are collected together by fileService Plugin (getFiles) -> bundleFileList
        bundleFileList = di_cont.__plugins.getFiles(path, nbExt, getDoubleExt);
               
        return bundleFileList; 
    },
    
    populateServiceList: function(di_cont, options, service,  bundle_file_list){
        bundle_file_list = bundle_file_list || bundleFileList;
                      
        for(i in bundle_file_list){
            if (!bundle_file_list.hasOwnProperty(i)) continue;
            var inc = bundle_file_list[i];
            
            //console.log(inc);
            
            var obj = require(inc);

            
            if(!obj.name){
                var tmp = inc.replace(options.root+'/', '');        
                obj.name = tmp.replace(nbExt, '');
            }
            
            var services = obj.__settings.__services;
            service.reg.push(obj);
            var index = service.reg.length -1;
            
            // create list of all imported services
            var imp = services.imports || [];
            imp = _.transform(imp, function(res, n){ if(n !== '') res.push(n);});
            service.deps.importList[index] = imp;
            service.deps.imports = _.union(imp, service.deps.imports);            
            
            // create list of all exported services
            var exp = services.exports || [];
            exp = _.transform(exp, function(res, n){ if(n !== '') res.push(n);});
            service.deps.exportList[index] = exp;
            service.deps.exports = _.union(exp, service.deps.exports);
            
            service.names[obj.name] = index;
            
            // create list of all    
            for(j in exp){
                if (!exp.hasOwnProperty(j) || exp[j] === '') continue;
                var service_name = exp[j];
                
                if(service.exp_list[service_name] !== undefined){
                    service.rewrites.push({ service: service_name, 
                                            module: obj.name,
                                            overwridenModule: service.reg[service.exp_list[service_name]]['name'],
                                            origFile: service.reg[service.exp_list[service_name]].__settings.__bundle_file,
                                            newFile: obj.__settings['__bundle_file']                                            
                                            });
                    if( 
                        obj.__settings['__services'] === undefined ||
                        obj.__settings['__services']['__rewrite'] === undefined ||
                        obj.__settings['__services']['__rewrite'] !== true){
                        errorHandle.errorOnRewrite(service.rewrites[service.rewrites.length -1]);
                    }
                }
                
                service.exp_list[service_name] = index;
            }
                        
            for(j in imp){
                if (!imp.hasOwnProperty(j) || imp[j] === '') continue;
                var service_name = imp[j];
                if(service.imp_list[service_name] !== undefined){
                    service.imp_list[service_name] = _.union(exp, service.imp_list[service_name]);
                }else{
                    service.imp_list[service_name] = exp;
                }
            }
            
            di_cont.use(obj, {} );            
        }
                 
        return service;
    }
};