var expect = require("chai").expect;
var fMaster = require("../plugins/pluginMaster/fileMaster.js");

var fsObj = require('./_fileCreationObj.js');


describe("fileMaster", function(){
   describe("@getFiles()", function(){
       it("should read all file in directories with one of the gived extentions ", function(){
          
            var path = 'tmp/serviceMaster_test';
            fsObj.cleanUp(path);
            var fList = fsObj.createFileInDir(path);
           
            var tmp = fMaster.getFiles(path);
            
            tmp.sort();   fList.sort();
            
            expect(tmp).to.deep.equal(fList);
           
            fsObj.cleanUp(path);
            
        });       
       it("Read all file in directories with extention '.nb.js' ", function(){
          
            var path = 'tmp/serviceMaster_test';
            fsObj.cleanUp(path);
            var fList = fsObj.createFileInDir(path, ['tr', 'qwe'], ['test','wer'], '.nb.js');
           
            var tmp = fMaster.getFiles(path);
            
            tmp.sort();   fList.sort();
            
            //console.log(tmp);
            //console.log(fList);
            
            expect(tmp).to.deep.equal(fList);
           
            fsObj.cleanUp(path);
            
        });       
    });
});

