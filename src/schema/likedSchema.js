const { default: mongoose } = require("mongoose");

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
       unique:true,
       required:true,
    }
    ,
    likedProduct: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required:true

    },
   
  },
  {
    Timestamp:true,
  }
]

    
})
const like = mongoose.model("like",likeSchema);
module.exports =like;