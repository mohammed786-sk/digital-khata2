const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to MongoDB");
    } catch (error) {
        console.error("MongoDb connection failed", error.message);
    }
};

module.exports = connectMongo;