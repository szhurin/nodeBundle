var nb = require('./index');

nb.attach(['bundles'],  __dirname+'/');

var di = nb.DI;

console.log('good');

di.hellou(' world');