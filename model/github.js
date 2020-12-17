const mongoose = require('mongoose');

const UserGithubSchema = new mongoose.Schema({
    githubId:{type:String,required:true},
    displayName:{type:String,required:true},
    firstName: {type:String,required:true},
    image: {type:String,required:true},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('github-oauth', UserGithubSchema)