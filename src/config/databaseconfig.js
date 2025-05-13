const mongoose = require('mongoose')
const { MONGO_URL } = require('./serverconfig')

const connectDb= async()=>
{
    try{
      await mongoose.connect(MONGO_URL);
      console.log("moongodb connected successfully");

    }
    catch(error){
       console.log("can not connected mongodb "+error);

    }
}
module.exports=connectDb;