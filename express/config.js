module.exports = {
  'port': process.env.API_PORT || 3001,
  'aws': {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_MINE,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MINE,
    region: process.env.AWS_REGION_MINE
  },
  'pw': {
    'userIdToParrot': process.env.SUPER_SECURE_PASSWORD
  }
}
