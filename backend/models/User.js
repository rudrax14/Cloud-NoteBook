const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    date: {
        type: Date,
        default: Date.now
    }
})

// module.exports = mongoose.model('user', userSchema);
const User = mongoose.model('user', userSchema);
// User.createIndexes();
module.exports = User;