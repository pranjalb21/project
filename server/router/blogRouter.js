const express = require('express');
const { AddBlog, GetAllBlog, UploadImage } = require('../controllers/blogController');
const validate = require('../middlewares/validateMiddleware');
const blogValidatorSchema = require('../validators/blogValidator');
const errorMiddleware = require('../middlewares/errorMiddleware');
const router = express.Router();


router
    .get('/', GetAllBlog)
    .post(`/add`,validate(blogValidatorSchema),errorMiddleware, AddBlog)

module.exports = router;