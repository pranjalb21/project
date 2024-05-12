const { S3Client } = require("@aws-sdk/client-s3");

const accessKey  = process.env.AWS_ACCESS_KEY_ID
const secretKey  = process.env.AWS_SECRET_ACCESS_KEY
const region  = process.env.AWS_REGION

const s3 = new S3Client({
  region: region,
  credentials:{
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  }
})

module.exports = s3;