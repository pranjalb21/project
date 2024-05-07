const mongoose = require('mongoose');
const User = require('./userModel');

const blogSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String },
        image: { type: String, required: [true, `Image is required`] },
        description: { type: String }
    },
    {
        timestamps: true
    }
)


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;