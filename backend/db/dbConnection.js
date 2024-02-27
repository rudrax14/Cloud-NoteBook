const mongoose = require('mongoose');
require('dotenv').config()
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/cloudnotebook';


const dbConnection = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed');
    }
}

module.exports = dbConnection;