// gcfn - get caller file name

module.exports = gcfn;

function gcfn() {
  return _getCallerFile();
}

function _getCallerFile() {
    try {
        var err = new Error(),callerfile,currentfile;       
        Error.prepareStackTrace = function (err, stack) {return stack;};
        currentfile=err.stack.shift().getFileName();
        var fl = 0;
        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();
            if(currentfile!==callerfile){
                if(fl === 0){
                    fl++;
                    currentfile = callerfile;
                }else{
                    return callerfile;
                }
            }
        }
    } catch (err) {}
    return undefined;
}
