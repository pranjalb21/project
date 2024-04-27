const mongoose = require('mongoose');

const URI = process.env.DB_URI;

const connectDB = async()=>{
    try {
        await mongoose.connect(URI);
        console.log(`Database connected successfully.`);
    } catch (error) {
        process.exit(0);
    }
}

module.exports = connectDB;