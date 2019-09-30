const AWS = require('aws-sdk')
const config = require('../config')

AWS.config.update(config.aws)

exports.Sounds = (req, res) => {
	let s3 = new AWS.S3()

	let params = {
		Bucket: 'media.soundsof.us',
		Delimiter: '/',
		Prefix: 'audio/'
	}

	s3.listObjectsV2(params, function (err, data) {
		if (err) {
			console.error("UNABLE TO LIST BUCKET:", err)
		} else {
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify(data))
		}
	})
}
