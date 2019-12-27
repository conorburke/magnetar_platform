const AWS = require('aws-sdk');
const multer = require('multer');

const upload = multer();

AWS.config.update({
	accessKeyId: process.env.AMAZON_ACCESS_KEY,
	secretAccessKey: process.env.AMAZON_SECRET_KEY
});
const s3 = new AWS.S3({ region: 'us-east-2' });

const db = require('../db');

module.exports = app => {
	app.post('/createtoolpicture', upload.single('image'), (req, res) => {
		const { depotId } = req.body;
		res.send('ok got it');
		let params = {
			Bucket: 'magnetar-tool-pictures',
			Body: req.file.buffer,
			Key: `uploads/${req.file.originalname}`,
			ACL: 'public-read'
		};

		s3.upload(params, (err, data) => {
			if (err) {
				console.log('s3 error', err);
			}
			if (data) {
				let tool_id = 0;
				db('tools')
					.select('id')
					.where({ depot_id: parseInt(depotId) })
					.orderBy('id', 'desc')
					.limit(1)
					.then(res => {
						tool_id = res[0].id;
						db('tool_pictures')
							.insert({ tool_id, image: data.Location })
							.then(res => res);
					});
			}
		});
	});
};
