const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        //mongo DB connection to the server 
        const con = mongoose.connect(process.env.MONGO_URI)
        if (con)
            console.log("mongoDb connected successfully");
        else 
            console.log("mongodb not connected, try again");
    }catch (err) {
        console.log("something went wrong ");
        process.exit();
    }

}
module.exports = connectDb