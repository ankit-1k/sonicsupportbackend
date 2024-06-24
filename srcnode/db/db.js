const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected');
    } catch (error) {
        console.error('Failed to connect to DB:', error);
    }
};
module.exports = connectDB;
// mongodb://127.0.0.1:27017/notes - laptop url
// mongodb+srv://sonicdev: F_*E5Ja98i$$2q3@cluster0.r5nc91a.mongodb.net/
// F_*E5Ja98i$$2q3