const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('../config')

AWS.config.update(config.aws)

const soundFolder = '../sounds/'

exports.saveSound = (req, res) => {
	let id = saveToS3(req.file.buffer)
	// saveToDB(id)
	// let uploadLocation = __dirname + '/../sounds/' + `${new Date().getTime()}` + ".wav"

	// fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
	// res.sendStatus(200); //send back that everything went ok
}

const saveToS3 = (buffer) => {
	console.log("hit")
	let s3bucket = new AWS.S3()

	let params = {
		Bucket: "media.soundsof.us",
		Key: "audio/" + `${new Date().getTime()}` + ".wav",
		ACL: "public-read",
		Body: Buffer.from(new Uint8Array(buffer))
	}
	
	s3bucket.upload(params, function (err, data) {
		if (err) console.log(err)
		else console.log(data)
	})


	// return "id"
}

const saveToDB = (id) => {
	let docClient = new AWS.DynamoDB.DocumentClient()

	let params = {
		TableName: "soundsofus",
		Item: {
			"id": id
		}
	}

	docClient.put(params, (err, data) => {
		if (err) console.error("UNABLE TO ADD SOUND:", err)
		else console.log("SOUND ADDED:", data)
	})
}