const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('../config')

AWS.config.update(config.aws)

const soundFolder = '../sounds/'

exports.saveSound = (req, res) => {
	let name = req.file.originalname + `+--+${new Date().getTime()}` + ".wav"
	saveToS3(req.file.buffer, name, res)
	
	// let uploadLocation = __dirname + '/../sounds/' + req.file.originalname + `+--+${new Date().getTime()}` + ".wav"
	// fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
}

const saveToS3 = (buffer, name, res) => {
	let s3bucket = new AWS.S3()

	let params = {
		Bucket: "media.soundsof.us",
		Key: "audio/" + name,
		ACL: "public-read",
		Body: Buffer.from(new Uint8Array(buffer))
	}
	
	s3bucket.upload(params, function (err) {
		if (err) {
			console.error("UNABLE TO ADD SOUND:", err)
		} else {
			console.log("SOUND ADDED TO DB AND S3")
			res.sendStatus(201)
		}
	})
}