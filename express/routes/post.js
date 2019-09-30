const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('../config')

AWS.config.update(config.aws)

const soundFolder = '../sounds/'

exports.saveSound = (req, res) => {
	let buffer = req.file.buffer
	let name = `${new Date().getTime()}+--+` + req.file.originalname + ".wav"
	let s3 = new AWS.S3()

	// Write to file for tests
	// let uploadLocation = __dirname + '/../sounds/' + name
	// fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(buffer)));

	let params = {
		Bucket: "media.soundsof.us",
		Key: "audio/" + name,
		ACL: "public-read",
		Body: Buffer.from(new Uint8Array(buffer))
	}
	
	s3.upload(params, function (err) {
		if (err) {
			console.error("UNABLE TO ADD SOUND:", err)
		} else {
			console.log("SOUND ADDED TO DB AND S3")
			res.sendStatus(201)
		}
	})
}
