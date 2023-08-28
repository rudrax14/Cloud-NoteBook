const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/cloudnotebook';

const connectToMongo = () => {
    mongoose.connect(dbUrl)
        .then(() => {
            console.log("CONNECTION OPEN!!!")
        })
        .catch(err => {
            console.log("OH NO ERROR!!!!")
            console.log(err)
        })
}

module.exports = connectToMongo;
