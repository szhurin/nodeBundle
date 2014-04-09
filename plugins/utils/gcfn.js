// gcfn - get caller file name

module.exports = gcfn;

function gcfn() {
  return _getCallerFile();
}

function _getCallerFile() {
    try {
        var err = new Error(), callerfile, currentfile, oldPrepareStackTrace;
        oldPrepareStackTrace = Error.prepareStackTrace;
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
                    Error.prepareStackTrace = oldPrepareStackTrace ;
                    return callerfile;
                }
            }
        }
    } catch (err) {}
    Error.prepareStackTrace = oldPrepareStackTrace ;
    return undefined;
}
