var expect = require("chai").expect;
var fMaster = require("../plugins/pluginMaster/fileMaster.js");
var fs = require('fs');

var createFileInDir = function(path, fileList, ext){
    path = path || 'tmp/serviceMaster_test';
    ext = ext || '';
    fileList = fileList || ['test1.js', 'test2.js', 'test3.nb.js'];
    
     if(!fs.existsSync('tmp')){
        fs.mkdirSync('tmp');
    }
    
    
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    var fList = [];
    for(i in fileList){
        var f = path+'/'+fileList[i]+ext;
        fList.push(f);
        fs.writeFileSync( f, 'test');
    }
    return fList;
};

var cleanUp = function(path, list){
    if(!fs.existsSync(path)){ return;}
    
    var fList = list;
    if(list === undefined) fList = fs.readdirSync(path);
    
        
    if(fList)
    for(i in fList){
        var f = fList[i];
        if(list === undefined) f = path+'/'+f;
        fs.unlinkSync(f);
    }
    
    fs.rmdirSync(path);
    
};


describe("fileMaster", function(){
   describe("@getFiles()", function(){
       it("should read all file in directory with one of the gived extentions ", function(){
          
            var path = 'tmp/serviceMaster_test';
            cleanUp(path);
            var fList = createFileInDir(path);
           
            var tmp = fMaster.getFiles(path);
            
            expect(tmp).to.deep.equal(fList);
           
            cleanUp(path, fList);
            
        });       
       it("should read all file in directory with one of the gived extentions ", function(){
          
            var path = 'tmp/serviceMaster_test';
            cleanUp(path);
            var fList = createFileInDir(path, ['test','wer'], '.nb.js');
           
            var tmp = fMaster.getFiles(path);
            
            expect(tmp).to.deep.equal(fList);
           
            cleanUp(path, fList);
            
        });       
    });
});

