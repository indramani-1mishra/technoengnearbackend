const { default: mongoose } = require("mongoose");

// Sub-schema for likedProduct
const likedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },
  { timestamps: true } // ✅ correct location
);

// Main schema
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  likedProduct: [likedProductSchema] // ✅ use embedded sub-schema
});

const like = mongoose.model("like", likeSchema);
module.exports = like;
