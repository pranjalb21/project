const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
    },
    {
        timestamps: true
    }
)

const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite;