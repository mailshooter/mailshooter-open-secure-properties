const open_secure_properties = require('mailshooter-open-secure-properties');
const util = require('util');

const properties = open_secure_properties(
	'secure-properties.yaml',
	'A8uyYca0074LKQ4G'
);

console.log(
	util.inspect(properties, false, null, true)
);
