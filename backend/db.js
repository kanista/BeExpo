const mongoose = require('mongoose');

// const MONGO_URI="mongodb+srv://kanista:kani02@beexpo.zjas1.mongodb.net/test?authSource=admin&replicaSet=atlas-b6gvh8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

const connectDB = async() =>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        })
        console.log(`Mongo connected `);
    }catch(error){
        console.error(`error ${error.message}`);
        process.exit(1);
        // console.log(error);
    }
}

module.exports = connectDB;



