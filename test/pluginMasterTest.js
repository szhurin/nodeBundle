var expect = require("chai").expect;
var pMaster = require("../plugins/pluginMaster/pluginMaster.js");
var fs = require('fs');

var createFiles = function(path, fileList, ext){
    var fList = [];
    for(i in fileList){
        var f = path+'/'+fileList[i]+ext;
        fList.push(f);
        fs.writeFileSync( f, 'test');
    }
    return fList;
};

var createFileInDir = function(path, dirList, fileList, ext){
    path = path || 'tmp/serviceMaster_test';
    dirList = dirList || ['test'];
    ext = ext || '';
    fileList = fileList || ['test1.js', 'test2.js', 'test3.nb.js'];
    
    if(!fs.existsSync('tmp')){
        fs.mkdirSync('tmp');
    }   
    
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    var fList = createFiles(path, fileList, ext);
    
    var testPath = path;
    
    for(i in dirList){
        var dir = dirList[i];
        testPath = path+ '/'+dir;
        if(!fs.existsSync(testPath)){
            fs.mkdirSync(testPath);
        }
        var tmp = createFiles(testPath, fileList, ext);
        fList = fList.concat(tmp);
    }
    
    return fList;
};

var cleanUp = function(path, list){
    if(!fs.existsSync(path)){ return;}
    
    var fList = list;
    if(list === undefined) fList = fs.readdirSync(path);
    
    for(i in fList){
        var f = fList[i];
        if(list === undefined) f = path+'/'+f;
        if (fs.statSync(f).isDirectory()){
            cleanUp(f);
            //fs.rmdirSync(f);
        }else{
            fs.unlinkSync(f);
        }
    }
    
    fs.rmdirSync(path);    
};

var getDoubleExt = function(fname){
                            var tmp = fname.split('.'); 
                            if(tmp.length>1) return '.'+tmp[tmp.length-2]+'.'+tmp[tmp.length-1];
                            else return fname;};


describe("pluginMaster", function(){
   describe("#__plugins.getFiles()", function(){
           
       it("Gets all file in directories with extention '.nb.js' ", function(){
          
            var path = 'tmp/serviceMaster_test';
            cleanUp(path);
            var fList = createFileInDir(path, ['tr', 'qwe'], ['test','wer'], '.nb.js');
           
            var obj = {};
            
            pMaster.attach.call(obj, {});
           
            var tmp = obj.__plugins.getFiles(path, '.nb.js', getDoubleExt );
            
            tmp.sort();   fList.sort();
            
            //console.log(tmp);
            //console.log(fList);
            
            expect(tmp).to.deep.equal(fList);
           
            cleanUp(path);
            
        });       
    });
});

