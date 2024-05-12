const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Favourite = require("../models/favouriteModel");
const { generateURL } = require("./blogController");

const AddToFavourite = async (req, res) => {
    const { user, blog } = req.body;
    try {
        const userId = new mongoose.Types.ObjectId(user);
        const blogId = new mongoose.Types.ObjectId(blog);
        const checkIfExists = await Favourite.findOne({ userId, blogId });
        if (checkIfExists) {
            res.status(409).send({ message: `Already added to favourite.` });
        }
        else {
            const getBlog = await Blog.findById(blogId);
            const getUser = await User.findById(userId);
            if (getBlog && getUser) {
                const favourite = await Favourite.create({ userId, blogId });
                res.status(201).send({ message: `The blog has been added to favourites.`, data: favourite });
            } else {
                res.status(404).send({ message: `Invalid data provided.` });
            }
        }
    } catch (error) {
        res.status(404).send({ message: `Something went wrong. Please try again` })
    }
}

const GetFavourite = async (req, res) => {
    const { user } = req.body;
    try {
        const userId = new mongoose.Types.ObjectId(user);
        const favs = await Favourite.find({ userId }).populate('userId').populate('blogId');
        if (favs) {
            const x = [];
            for (const blog of favs) {
                const url = await generateURL(blog.blogId.image)
                x.push({
                    ...blog._doc.blogId._doc,
                    imageURL: url
                })
            }
            res.status(200).send({ message: `Favourite blogs loaded.`, data: x });
        } else {

            res.status(200).send({ message: `No blogs to show.` });
        }
    } catch (error) {
        res.status(404).send({ message: `Invalid data.`, error });
    }
}

const DeleteFavourite = async (req, res) => {
    const { user, blog } = req.body;
    try {
        const userId = new mongoose.Types.ObjectId(user);
        const blogId = new mongoose.Types.ObjectId(blog);
        const checkIfExists = await Favourite.findOne({ userId, blogId });
        if (!checkIfExists) {
            res.status(409).send({ message: `Invalid data.` });
        }
        else {
            const favourite = await Favourite.deleteOne({ userId, blogId });
            if (favourite)
                res.status(201).send({ message: `Item removed from favourites.` });
            else
                res.status(404).send({ message: `Something went wrong. Please try again` })
        }
    } catch (error) {
        res.status(404).send({ message: `Something went wrong. Please try again` })
    }
}

module.exports = { AddToFavourite, GetFavourite, DeleteFavourite }