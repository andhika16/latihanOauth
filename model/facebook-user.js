const mongoose = require('mongoose');

const UserFacebokSchema = new mongoose.Schema({
    facebookId:String,
    displayName: String,
    firstName:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('facebook-oauth', UserFacebokSchema)