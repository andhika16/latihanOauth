const mongoose = require('mongoose');
const keys = require('./keys');
const connectDB =  async () => {

    try {
        await mongoose.connect(keys.mongodbId.dbURI,{
            useNewUrlParser:true, 
            useUnifiedTopology:true
        } , () => {
            console.log('connected to database');
        })    
    } catch (error) {
        console.log(error);
    }
    
}
module.exports = connectDB