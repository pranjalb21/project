const express = require('express');
const { AddBlog, GetAllBlog, UploadImage } = require('../controllers/blogController');
const validate = require('../middlewares/validateMiddleware');
const blogValidatorSchema = require('../validators/blogValidator');
const errorMiddleware = require('../middlewares/errorMiddleware');
const upload = require('../middlewares/imageUploadMiddleware');
const router = express.Router();


router
    .get('/', GetAllBlog)
    .post(`/add`, validate(blogValidatorSchema), errorMiddleware, AddBlog)
    .post('/upload', upload.single('image'), UploadImage)

module.exports = router;