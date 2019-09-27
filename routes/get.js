const AWS = require('aws-sdk')
const config = require('../config')

AWS.config.update(config.aws)

exports.Sounds = (req, res) => {
	// return getSounds()
	return getSounds()

	// res.json(finalData)
}

const getSounds = (i) => {
	const docClient = new AWS.DynamoDB.DocumentClient()

	let params = {
		TableName: "soundsofus"
	}

	docClient.scan(params, (err, data) => {
		if (err) console.error("UNABLE TO ADD SOUND:", err)
		else console.log("SOUND ADDED:", data)
	})
}
