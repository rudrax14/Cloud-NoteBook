const mongoose = require('mongoose');

const connectToMongo = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/cloudnotebook')
        .then(() => {
            console.log("CONNECTION OPEN!!!")
        })
        .catch(err => {
            console.log("OH NO ERROR!!!!")
            console.log(err)
        })
}

module.exports = connectToMongo;
