const express = require('express');
const blogController = require('../controllers/blogController');
const validate = require('../middlewares/validateMiddleware');
const blogValidatorSchema = require('../validators/blogValidator');
const errorMiddleware = require('../middlewares/errorMiddleware');
const upload = require('../middlewares/imageUploadMiddleware');
const router = express.Router();


router
    .get('/', blogController.GetAllBlog)
    .post(`/add`,validate(blogValidatorSchema),errorMiddleware, blogController.AddBlog)
    .post(`/getBlogByUser`, blogController.GetBlogByUserId)
    .post(`/upload`,upload.single('image'), blogController.UploadBlog)

module.exports = router;