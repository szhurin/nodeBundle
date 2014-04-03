var nb = require('./index');

nb.attach(['bundles', 'bundles1'],  __dirname+'/');

var di = nb.DI;

console.log('good');

di.hellou(' world');
di.hellour(' world');
di.hellor(' world');