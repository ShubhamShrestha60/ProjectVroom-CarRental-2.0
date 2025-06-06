/*global require, module*/
const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('Client', userSchema);

module.exports = userModel;