const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogModel")

const AddBlog = async (req, res) => {
    const { userId, title, image, description } = req.body;
    const newUserId = new mongoose.Types.ObjectId(userId)
    try {
        const result = await Blog.create({ userId: newUserId, title, image, description });
        res.status(201).send({ message: `Blog has been posted successfully.`, data: result })
    } catch (error) {
        console.log(error)
        res.status(400).send(`Something went wrong. Please try again.`)
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

const UploadImage = async (req, res) =>{
    res.status(201).send(req.file.filename);
}

module.exports = { AddBlog, GetAllBlog, UploadImage }