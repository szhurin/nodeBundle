var fs = require('fs');


var getFileNamePart = function(fname){
    var tmp = fname.split('.');
    var c = tmp.length;
    return "."+tmp[c-2]+"."+tmp[c-1] ;
};

var getFileExt = function(fname){
    var tmp = fname.split('.');
    return "."+tmp.pop();
};



var pathNameFix = function(bundleName, rootDir){
    rootDir = rootDir || '';
    if(rootDir[rootDir.length -1] !== '/') rootDir +='/';
    if(bundleName[bundleName.length -1] !== '/') bundleName +='/';
    if(bundleName[0] === '/') bundleName = bundleName.substr(1);
    return rootDir + bundleName ; 
};

var getFiles = function(dir, exts, f){
    if(exts === undefined){
        exts = ['.js'];
    }
    
    f = f || getFileExt;    
    //f = f || getFileNamePart;
    
    var res = [];    
    
    if(dir[dir.length -1] !== '/') dir +='/';
    
    if(fs.existsSync(dir)){
        var files = fs.readdirSync(dir);
        for(var i in files){
            if (!files.hasOwnProperty(i)) continue;
            var name = dir+files[i];    
            if (fs.statSync(name).isDirectory()){
                res = res.concat(getFiles(name, exts, f));
            }else{
                var ext = f(files[i]);
                if (exts.indexOf(ext)>=0) {
                    res.push(name);
                }
            }
        }
    }
    return res;
};

module.exports.getFiles = getFiles;
module.exports.pathNameFix = pathNameFix;