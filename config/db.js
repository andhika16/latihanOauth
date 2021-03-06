const mongoose = require('mongoose');
const connectDB =  async () => {

    try {
        await mongoose.connect(process.env.dbURI,{
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