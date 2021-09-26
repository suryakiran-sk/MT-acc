/* eslint-disable no-else-return */
const multer = require('multer');
const path = require('path');

const { unlinkFiles } = require('../modules/fileOperations');

const fileSettings = {
	file: {
		maxSize: 5,
	},
};

const storage = multer.diskStorage({
	destination: './public/uploads/csvFiles/',
	filename(req, file, cb) {
        if (path.extname(file.originalname) === '.csv') {
			return cb(null, `data_${Date.now()}${path.extname(file.originalname)}`);
	}
		const errorMsg = 'Invalid file type';
		return cb(errorMsg);
	},
});

const upload = multer({ storage }).fields([
	{
		name: 'file',
		maxCount: 5,
	}
]);

// custom error handling middleware for file upload
module.exports = async (req, res, next) => {
	const files = [];
	try {
		upload(req, res, err => {
			if (req.files) {
				let validationError = err || '';
				const { file } = req.files;

				// file size validation
				file &&
					file.some(fl => {
						const fileSize = fl.size / (1024 * 1024);
						files.push(fl);
						if (fileSize > fileSettings.file.maxSize) {
							validationError = 'File should not be greater than 5MB';
							return true;
						}
						return false;
					});

				if (validationError) {
					unlinkFiles(files);
					return res.status(400).json({
								success: false,
								message: validationError
							});
				}
			}
			next();
		});
	} catch (error) {
		console.log(error);

		unlinkFiles(files);
		res.locals['responseFormat'] = 'json';
		return next(error);
	}
};
