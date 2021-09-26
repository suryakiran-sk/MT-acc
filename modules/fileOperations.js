const fs = require('fs');

module.exports = {
	unlinkFiles: async (imageData = []) => {
		if (imageData && imageData.length) {
			imageData.map(async i => {
				return await new Promise((resolve, reject) =>
					fs.unlink(i.path, err => {
						if (err) return reject(err);
						return resolve();
					}),
				);
			});
		}
		return false;
	},
	readFilePromise: path =>
		new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) return reject(err);
				return resolve(data);
			});
		}),
};
