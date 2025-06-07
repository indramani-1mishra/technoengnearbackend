const { searchById } = require("../repository/userrepository");
const { createUserFromService } = require("../service/userservice");


const createUserc = async (req, res) => {
  
  
  try {
    const response = await createUserFromService({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      role:req.body.role,
    });

    if (!response) {
      return res.status(500).json({
        message: "User not created",
        error: "Unknown error occurred",
        data: {},
      });
    }

    // ✅ Success Response
    return res.status(201).json({
      message: "User created successfully",
      data: response,
      error: {},
    });

  } catch (error) {
    return res.status(400).json({
      message: "User not created",
        error: error.originalError || error.message || error,
      data: {},
    });
  }
};

const getUserByIdc =async(req,res)=>{
  console.log(req.user+"user");
  try{
    const response = await searchById(req.params.id);
     return res.status(200).json({
      message:"user fetched successfully",
      data:response,
      error:{},
      status:200,

     })

  }catch(error){
      return res.status(404).json({
        message:"error in find user by id ",
        error:error,
        data:{},
        status:404,
      })
  }
}

module.exports = {
  createUserc,
  getUserByIdc,
};

