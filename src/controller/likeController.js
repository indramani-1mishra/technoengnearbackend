const { json } = require("express");
const { addToLike, getlikedProduct, removeTolike } = require("../service/likedservice");


const Likecontroller = async (req, res) => {
   
  try {
    // userID from token, productID from URL
    const response = await addToLike(req.params.id, req.user.id);

    // Agar product already liked tha to bhi response milega
    return res.status(201).json({
      message: response.message || "Liked successfully",
      status: 201,
      data: response.data || {},
      error: ""
    });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({
      message: "Error in add to like",
      status: 500,
      data: {},
      error: error?.message || "Something went wrong"
    });
  }
};

const getalllikes = async(req,res)=>
{
    try{
     const response = await getlikedProduct();
     return res.status(200).json({
        message:"find alllikes product successfully",
        data:response,
        error:{},
        status:200
     })
    }
    catch(error){
          res.status(500).json({
      message: "Error in finding likes",
      status: 500,
      data: {},
      error: error?.message || "Something went wrong"
    });

    }
}
const unLikecontroller = async (req, res) => {
   
  try {
    // userID from token, productID from URL
    const response = await removeTolike(req.params.id, req.user.id);

    // Agar product already liked tha to bhi response milega
    return res.status(201).json({
      message: response.message || "unLiked successfully",
      status: 201,
      data: response.data || {},
      error: ""
    });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({
      message: "Error in remove to like",
      status: 500,
      data: {},
      error: error?.message || "Something went wrong"
    });
  }
};


module.exports = {
  Likecontroller,
  getalllikes,
  unLikecontroller
};

