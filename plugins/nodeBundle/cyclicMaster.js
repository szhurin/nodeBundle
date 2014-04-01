var _ = require("lodash");
var SM = require('simplematrix');

var dim;

var sum = function(arr){
    return _.reduce(arr, function(sum, num) {
        return sum + num;
    });
};

var getCycle = function(mat, index, cycle, first){
            
    var cycle_fl = false;
    cycle.push(index);
    var vec = mat[index];
    var fl = false;
    
    //console.log(['i',index, first, cycle]);
    
    for(i= 0; i<vec.length; i++){
        //console.log(['=',i]);
        
//        if(cycle[0] === cycle[cycle.length-1] && cycle.length>1) break;//return cycle;
//        else{console.log(['cycle_loop', cycle, cycle.length, cycle[0], cycle[cycle.length-1]])}
        
        if(vec[i] === 1){
            //console.log(['+', i, '->', vec[i]]);
            if(i === first){
                cycle.push(i);
                fl = true;
                break;
            }else{
                //console.log('call', i);
                var tmp = getCycle(mat, i, cycle, first);
                
                if(tmp !== false){
                    //console.log(['tmp', tmp]);
                    cycle = tmp;
                    fl = true;
                    if(cycle[0] === cycle[cycle.length-1]) break;//return cycle;
                    
                }
                fl = false;
            }
        }
    }
    if(fl){
        //console.log(['cycle', cycle]);
        return cycle;
    }else{
        //console.log(['index', index]);
        return false;
    }
};

var getDiag = function(mat){
    var diag = [];
    for(i in mat){
        if (!mat.hasOwnProperty(i)) continue;
        diag[i] = mat[i][i];
    }
    return diag;
};

var getIndexOfService = function(name, service){
   
    var index = service.deps.exports.indexOf(name); 
    return index;
};

var calcMatrix = function(service){
    var exps = service.deps.exports;
    dim = exps.length;
    
    var mat = Array(dim);
    
    for(i in exps){
        if (!exps.hasOwnProperty(j)) continue;
        var service_name = exps[i];       
        
        
        var vec = Array(dim);
        
        for(k=0; k<dim; k++){
            vec[k] =0;
        }
        
        var exp_list = service.imp_list[service_name];        
        
        for(j in exp_list){
            var exp_name = exp_list[j];
            var service_index = getIndexOfService(exp_name, service);
            
            if(service_index !== -1){
                vec[service_index] = 1;
            }                
        }
        
        mat[i] = vec;
    }
    
    return mat;
    
};

module.exports.calcMatrix = function(services){
    return calcMatrix(services);
};

module.exports.calculateCyclic = function(services){
    var matArr = calcMatrix(services);
    
    var A = new SM.Matrix(matArr);
    var B = A;
    var count = 0;
    
    var fl = false;
    var diag;
    while (count !== dim){
        
    
        A = A.times(B);
        
        diag = getDiag(A);
        
        if(sum(diag) >0){
            fl = true; break;
        } 
        count++;
        
    }
    
    if(fl){
       //var tmp = getCycle([[0,1,0,1],[0,0,1,0],[1,0,0,1],[0,0,0,0]], 1, [], 1 );
       //var tmp = getCycle([[0,1,1,0,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,1,0,0]], 0, [], 0 );
        var index = _.indexOf(diag, 1);
        var tmp = getCycle(matArr, index, [], index );
        // console.log(tmp); 
        var exps = services.deps.exports;
        var servs = [];
        for(i in tmp){
            if (!tmp.hasOwnProperty(i)) continue;
            var j = tmp[i];
            servs.push(exps[j]);
        }
        // console.log(servs); 
        return servs;
    }
    
    
    
    
    return false;
};