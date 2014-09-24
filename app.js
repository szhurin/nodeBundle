var nb = require('./index');
console.log('____________________________________________');
nb.attach(['bundles']);
nb.attach(['bundles1']);

var di = nb.DI;

//console.log('-----------------------------');
console.log((di.___nb.getPluginList()).names);
console.log((di.___nb.getPluginList()).exp_list);
console.log((di.___nb.getPluginList()).imp_list);
console.log((di.___nb.getPluginList()).deps);


di.hello(' world');
//di.hellour(' world');
//di.hellor(' world');

console.log('++++++++++++++++++++++++++++++++');

