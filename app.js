var nb = require('./plugins/nodeBundle');

nb.attach({bundleDirs : ['bundles'], pluginDir: 'plugins', root: __dirname+'/'});
nb.init();

var di = nb.getDI();

console.log('good');

di.hellou(' world');