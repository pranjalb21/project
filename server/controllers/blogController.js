const Blog = require("../models/blogModel")
const upload = require('../middlewares/imageUploadMiddleware')
const mongoose = require("mongoose");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require('sharp');
const s3 = require("../utils/aws-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const generateURL = async (imageName) => {
    const bucketName = process.env.AWS_S3_BUCKET;
    //Generate image URL using image name
    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName
    }
    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 86400 });
    return url;
}

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
        const result = await Blog.find({}).sort({ createdAt: -1 }).populate('userId');
        const x = [];
        for(const blog of result){
            const url = await generateURL(blog.image)
            x.push({
                ...blog._doc,
                imageURL: url
            })
        }
        if (result.length > 0)
            res.status(200).send({ message: `Blogs has been fetched`, data: x });
        else
            res.status(200).send({ message: `No blogs to show.` });

    } catch (error) {
        res.status(400).send(`Something went wrong. Please try again.`)
    }
}

const GetBlogByUserId = async (req, res) => {
    try {
        const { user } = req.body;
        const blogs = await Blog.find({ userId: user }).sort({ createdAt: -1 });
        const x = [];
        for(const blog of blogs){
            const url = await generateURL(blog.image)
            x.push({
                ...blog._doc,
                imageURL: url
            })
        }
        if (blogs.length > 0) {
            res.status(200).send({ message: `Blogs has been fetched`, data: { blogs: x, favourites: [] } });
        } else {
            res.status(200).send({ message: `No blogs to show.` });
        }
    } catch (error) {
        res.status(400).send({ message: `User not found` });
    }
}

const UploadBlog = async (req, res) => {
    try {
        const bucketName = process.env.AWS_S3_BUCKET;

        //Edit image dimention and type
        const buffer = await sharp(req.file.buffer)
            .resize({
                width: 1200,
                height: 630,
                fit: sharp.fit.fill
            })
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4'
            })
            .toBuffer();

        //Create unique image name
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpeg'

        //Upload the image to AWS S3
        const params = {
            Bucket: bucketName,
            Key: uniqueFileName,
            Body: buffer,
            ContentType: req.file.mimetype
        }

        const putCommand = new PutObjectCommand(params);
        await s3.send(putCommand);

        //Save the image name and other form data into Database
        const result = await Blog.create({
            userId: new mongoose.Types.ObjectId(req.body.userId),
            title: req.body.title,
            image: uniqueFileName,
            description: req.body.description
        });

        const data = {
            ...result._doc,
            imageURL: await generateURL(result.image)
        }
        res.status(201).send({ message: `Blog has been posted successfully.`, data });
    } catch (error) {
        res.status(500).send({ message: `Something went wrong. Please try again.` });
    }
}


module.exports = { AddBlog, GetAllBlog, UploadBlog, GetBlogByUserId }