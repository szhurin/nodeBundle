var nb = require('./index');

nb.attach(['bundles', 'bundles1']);

var di = nb.DI;

di.hello(' world');
di.hellour(' world');
di.hellor(' world');