const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogModel")
const upload = require('../middlewares/imageUploadMiddleware')

const AddBlog = async (req, res) => {
    try {
        const { userId, title, image, description } = req.body
        const result = await Blog.create({ userId, title, image, description });
        if (result) {
            res.status(201).send({ message: `Blog has been posted successfully.`, blog: result });
        } else {
            res.status(400).send({ message: `Something went wrong. Please try again.` });
        }
    } catch (error) {
        res.status(400).send({ message: `Something went wrong. Please try again.` });

    }
}

const GetAllBlog = async (req, res) => {
    try {
        const result = await Blog.find({}).populate('userId');
        if (result.length > 0)
            res.status(200).send({ message: `Blogs has been fetched`, data: result });
        else
            res.status(200).send({ message: `No blogs to show.` });

    } catch (error) {
        res.status(400).send(`Something went wrong. Please try again.`)
    }
}

const UploadImage = async (req, res) => {
    if (req.file) {
        res.status(201).send(req.file.filename);
    } else {
        res.status(400).send({ message: `Please select an image for upload.` });

    }
}

module.exports = { AddBlog, GetAllBlog, UploadImage }