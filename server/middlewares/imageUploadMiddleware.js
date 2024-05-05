const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../client/public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         console.log(req.body);
//         console.log(file);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' +
//             file.originalname.split('.')[file.originalname.split('.').length - 1]
//         cb(null, uniqueSuffix)
//     }
// })



// const upload = multer({ storage: storage });

const upload = multer({
    storage: multerS3({
        s3,
        bucket: "travelblog-p ",
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname })
        },
        key: function (req, file, cb) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' +
            //     file.originalname.split('.')[file.originalname.split('.').length - 1]
            cb(null, 'imag.jpg')
        }
    })
});

module.exports = upload;