const fs = require('fs');
const yaml = require('yaml');
const mcrypt = require('mcrypt').MCrypt;
const serpent = new mcrypt('serpent', 'cbc');

const toString = (data) => {
	var string = '';
	for (var i = 0; i < data.length; i++) {
		if (data[i]) {
			string += String.fromCharCode(data[i]);
		}
	}
	return (string);
}

const decrypt = (data, k) => {
	const iv = serpent.generateIv();
	serpent.open(Buffer.from(k, 'ascii'), iv);
	const decrypted = serpent.decrypt(Buffer.from(data, 'base64'));
	return (toString(decrypted));
}

const open_secure_properties_recursive = (object, k) => {
	if (typeof object == "object") {
		const keys = Object.keys(object);
		keys.map((key) => {
			if (typeof object[key] == "object")
				object[key] = open_secure_properties_recursive(object[key], k);
			if (typeof object[key] == "string")
				object[key] = decrypt(object[key], k);
		})
	}
	return (object);
}

const open_secure_properties = (f, k) => {
	const content = fs.readFileSync(f, 'utf-8');
	const object = yaml.parse(content);
	return (open_secure_properties_recursive(object, k));
}

module.exports = open_secure_properties;
