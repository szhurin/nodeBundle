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

var getFiles = function(dir, exts, f){
    if(exts === undefined){
        exts = ['.js'];
    }
    
    f = f || getFileExt;    
    
    //f = f || getFileNamePart;
    
    var res = [];  
    
     
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];    
        if (fs.statSync(name).isDirectory()){
            res = res.concat(getFiles(name, exts, f));
        }else{
            var ext = f(files[i]);
            if (exts.indexOf(ext)>=0) {
                res.push(name);
            }
        }
    }
    return res;
};

module.exports.getFiles = getFiles;