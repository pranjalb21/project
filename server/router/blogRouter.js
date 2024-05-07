const express = require('express');
const blogController = require('../controllers/blogController');
const validate = require('../middlewares/validateMiddleware');
const blogValidatorSchema = require('../validators/blogValidator');
const errorMiddleware = require('../middlewares/errorMiddleware');
const router = express.Router();


router
    .get('/', blogController.GetAllBlog)
    .post(`/add`,validate(blogValidatorSchema),errorMiddleware, blogController.AddBlog)
    .post(`/getBlogByUser`, blogController.GetBlogByUserId);

module.exports = router;