const like = require("../schema/likedSchema");
const Product = require("../schema/productschema");

const addToLike = async (Productid, userid) => {
  try {
    const isLikeProduct = await like.findOne({ user: userid });

    if (!isLikeProduct) {
      const response = await like.create({
        user: userid,
        likedProduct: [ { product: Productid } ]

      });
      return { message: 'Product liked', data: response };
    }

    //console.log("Liked Products:", isLikeProduct.likedProduct);

    const alreadyExists = isLikeProduct.likedProduct.some(
      (item) => item?.product.toString() === Productid
    );

    if (alreadyExists) {
      return { message: 'Product already liked' };
    }

    isLikeProduct.likedProduct.push({ product: Productid });
    const updatedDoc = await isLikeProduct.save();

    return { message: 'Product liked successfully', data: updatedDoc };
  } catch (error) {
    console.log("Like error:", error);
    throw { message: 'Error in creating like', error };
  }
};

const getlikedProduct = async () => {
  try {
    const response = await like.find().populate('likedProduct.product');
    if (response) {
      return response;
    }
    throw { message: "error in finding get all likes" };
  } catch (error) {
    throw error;
  }
};

const removeTolike = async (Productid, userid) => {
  try {
    const islikedproduct = await like.findOne({ user: userid });
    if (!islikedproduct) {
      throw { message: "No liked products found for this user" };
    }
   const exists = islikedproduct.likedProduct.some(
  (item) => item?._id.toString() === Productid
);

if (!exists) {
  throw "This product is not liked by the user" ;
}


    // Product remove karo
    islikedproduct.likedProduct = islikedproduct.likedProduct.filter(
      (item) => item._id.toString() !== Productid
    );

    // Save updated data
    await islikedproduct.save();

    return islikedproduct;
  } catch (error) {
    throw { message: error };
  }
};

    

module.exports = {
  addToLike,
  getlikedProduct,
  removeTolike,
};
