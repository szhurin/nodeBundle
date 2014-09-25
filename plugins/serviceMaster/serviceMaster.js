var _ = require("lodash");
var errorHandle = require('../errorMaster');

function getDoubleExt(fname) {
    var tmp = fname.split('.');
    var c = tmp.length;
    return "." + tmp[c - 2] + "." + tmp[c - 1];
}

var bundleFileList;
var nbPath;
var nbExt;
var root;

function getModuleName(name) {
    var tmp = name.replace(root, '');
    return tmp.replace(nbExt, '');
}

function initPrivates(rootPath, ext) {
    nbExt = ext || [".nb.js"];
    root = rootPath;
}



/**
 *   get The list of file located under given dir with given extention
 *
 *   @param object di_cont - the di container
 *   @param object options -  an array of global options
 *   @param string dir - one string containing the dir name
 *   @param array ext - an array of extentions to search for in the dir
 **/
function getFileList(di_cont, options, dir, ext) {

    initPrivates(options.root, ext);


    if (di_cont.__plugins === undefined) { // no need to import plugin more than once
        di_cont.use(require("../pluginMaster"), {init: true});
    }

    if (dir === undefined) {
        return [];
    }

    var path = dir;
    //bundleFiles are included by directory passed through dir
    bundleFileList = di_cont.__plugins.getFiles(path, nbExt, getDoubleExt);

    // return the list of files
    return bundleFileList;
}

/**
 *   compile the list of setting of Services in the service list (service registry)
 *
 *    @param object services - the servicecompilation object
 *    @param int id - if set then get only that id from the service reg
 *
 **/
function getPluginsSettings(services, id) {
    var reg = services.reg;
    if (id) {
        if (reg[id] !== undefined) {
            return reg[id].__settings;
        }
    }
    var ret = [];
    for (var i in reg) {
        if (!reg.hasOwnProperty(i))
            continue;
        if (reg[i]['__settings'] !== undefined) {
            ret.push(reg[i]['__settings']);
        }
    }
    return ret;
}




function populateServiceReg(di_cont, options, services, bundle_file_list) {
    bundle_file_list = bundle_file_list || bundleFileList;


    for (var i in bundle_file_list) {
        if (!bundle_file_list.hasOwnProperty(i))
            continue;
        var inc = bundle_file_list[i];

        //console.log(inc);

        var obj = require(inc);

        // ensure Object.name
        if (!obj.name) {
            obj.name = getModuleName(inc);
        } else {
            obj.name = '' + obj.name;
        }

        var servicesList = obj.__settings.__services;
        
        services.reg.push(obj);
        
        var index = services.reg.length - 1;

        // create list of all imported services
        var imp = servicesList.imports || [];
        var exp = servicesList.exports || [];

        services = setDependencies(imp, exp, index, services);

        if (services.names[obj.name] !== undefined) {
            errorHandle.errorOnBundleOverride(obj.name, services, obj);
        }
        services.names[obj.name] = index;

        // create list of all Export & Import Lists
        services = setExpList(imp, exp, index, services);
        services = setImpList(imp, exp, services);

        di_cont.use(obj, options);
    }

    return services;
}

function setDependencies(imp, exp, index, services)
{
    imp = _.transform(imp, function (res, n) {
        if (n !== '')
            res.push(n);
    });
    services.dependencies.importList[index] = imp;
    services.dependencies.imports = _.union(imp, services.dependencies.imports);

    // create list of all exported services
    exp = _.transform(exp, function (res, n) {
        if (n !== '')
            res.push(n);
    });
    services.dependencies.exportList[index] = exp;
    services.dependencies.exports = _.union(exp, services.dependencies.exports);

    return services;

}

function setExpList(exp, obj, index, services)
{
    for (var j in exp) {
        if (!exp.hasOwnProperty(j) || exp[j] === '')
            continue;
        var service_name = exp[j];

        services = setRewrite(service_name, obj, services);

        services.exp_list[service_name] = index;
    }
    return services;
}

function setRewrite(service_name, obj, services)
{
    if (services.exp_list[service_name] !== undefined) {
        services.rewrites.push({service: service_name,
            module: obj.name,
            overwridenModule: services.reg[services.exp_list[service_name]]['name'],
            origFile: services.reg[services.exp_list[service_name]].__settings.__bundle_file,
            newFile: obj.__settings['__bundle_file']
        });
        if (
                obj.__settings['__services'] === undefined ||
                obj.__settings['__services']['__rewrite'] === undefined ||
                obj.__settings['__services']['__rewrite'] !== true) {
            errorHandle.errorOnRewrite(services.rewrites[services.rewrites.length - 1]);
        }
    }
    return services;
}

function setImpList(imp, exp, services)
{
    for (var j in imp) {
        if (!imp.hasOwnProperty(j) || imp[j] === '') {
            continue;
        }

        var service_name = imp[j];
        if (services.imp_list[service_name] !== undefined) {
            services.imp_list[service_name] = _.union(exp, services.imp_list[service_name]);
        } else {
            services.imp_list[service_name] = exp;
        }
    }
    return services;
}

//   ----------  EXPORTS  --------------

module.exports = {
    getModuleName: getModuleName,
    getPluginsSettings: getPluginsSettings,
    getFileList: getFileList,
    // go through all bundles & reginter them & there services
    // caveats move USE into bundleMaster.init - manage only module registration here
    populateServiceReg: populateServiceReg
};