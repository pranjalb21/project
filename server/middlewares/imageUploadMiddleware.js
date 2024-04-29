const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.'+
        file.originalname.split('.')[file.originalname.split('.').length-1]
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage });

module.exports = upload;