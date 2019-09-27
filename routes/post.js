const AWS = require('aws-sdk')
const config = require('../config')

AWS.config.update(config.aws)

exports.saveSound = (sound) => {
    let id = saveToS3(sound)
    saveToDB(id)
}

const saveToS3 = (sound) => {
    //  let s3bucket = new AWS.S3(

    // var params = {
    //     Bucket: BUCKET_NAME,
    //     Key: file.name,
    //     Body: file.data
    // };
    // s3bucket.upload(params, function (err, data) {
    //     if (err) {
    //         console.log('error in callback');
    //         console.log(err);
    //     }
    //     console.log('success');
    //     console.log(data);
    // });


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