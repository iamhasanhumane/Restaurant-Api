const mongoose = require('mongoose') ;  
const colors  = require('colors') ; 


// function mongodb database connection 
const connectDb = async() => {
    try {
        console.log(encodeURI(process.env.MONGO_URL));  
        await mongoose.connect(encodeURI(process.env.MONGO_URL));    
        console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite.black)  
    } catch (error) {
        console.log('DB ERROR'.bgRed.white , error.bgRed);      
    }
}
module.exports = connectDb ;    