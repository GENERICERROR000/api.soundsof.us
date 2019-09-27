const AWS = require('aws-sdk')
const config = require('../config')

exports.saveTweet = (userId, tweet) => {
  AWS.config.update(config.aws)

  const docClient = new AWS.DynamoDB.DocumentClient()

  var params = {
    TableName: userId + '-tweets',
    Item: tweet
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("unable to add item:", err)
    } else {
      console.log("ITEM ADDED:", data)
    }
  })
}
