var nb = require('./index');
console.log('____________________________________________');
nb.attach(['bundles', 'bundles1']);
//nb.attach(['bundles1']);

var di = nb.DI;

//console.log('-----------------------------');
console.log((di.__nbundles.getPluginList()).names);
console.log((di.__nbundles.getPluginList()).exp_list);
console.log((di.__nbundles.getPluginList()).imp_list);
console.log((di.__nbundles.getPluginList()).deps);


di.hello(' world');
//di.hellour(' world');
//di.hellor(' world');

console.log('++++++++++++++++++++++++++++++++');
