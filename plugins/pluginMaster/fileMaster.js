var fs = require('fs');


function getFileNamePart(fname){
    var tmp = fname.split('.');
    var c = tmp.length;
    return "."+tmp[c-2]+"."+tmp[c-1] ;
}

function getFileExt(fname){
    var tmp = fname.split('.');
    return "."+tmp.pop();
}

/*
*   fixes the relative dir name and adds it to the root dir name
*   avare of all slashes
*
*   @param string dir - the name of the directory
*   @param string rootDir - the name of the rootDir
*
*   @returns string the global dir name
*/
function pathNameFix(dir, rootDir){
    rootDir = rootDir || '';
    if(rootDir[rootDir.length -1] !== '/') rootDir +='/';
    if(dir[dir.length -1] !== '/') dir +='/';
    if(dir[0] === '/') dir = dir.substr(1);
    return rootDir + dir ;
}

/*
*   gets the file List
*
*   @param string dir - the name of the directory to look for files in
*   @param array exts - the array of extentions to check the files against
*   @param function f - the function to get the file part co compare it with exts array
*
*   returns the list of files in the given directory that are passed the "exts" compare with "f"
*/
function getFiles(dir, exts, f){
    if(exts === undefined){
        exts = ['.js'];
    }

    f = f || getFileExt;
    //f = f || getFileNamePart;

    var res = [];

    if(dir[dir.length -1] !== '/') dir +='/';

    if(fs.existsSync(dir)){                     // walk the directory and find all the files with needed extentions
        var files = fs.readdirSync(dir);        // get list of
        for(var i in files){
            if (!files.hasOwnProperty(i)) continue;
            var name = dir+files[i];                // get file name
            if (fs.statSync(name).isDirectory()){   // if file is Directory
                res = res.concat(getFiles(name, exts, f));
            }else{                              // if is file
                var ext = f(files[i]);
                if (exts.indexOf(ext)>=0) {     // if file is one that we need
                    res.push(name);
                }
            }
        }
    }
    return res;
}

module.exports.getFiles = getFiles;
module.exports.pathNameFix = pathNameFix;