const { createUser, searchByEmail, searchById } = require("../repository/userrepository");

const createUserFromService = async (userDetails) => {
   
  try {
    const { email } = userDetails;
    
    const findEmail = await searchByEmail(email);
    if (findEmail) {
      throw {
        message: "User already exists, please try with a new email",
        code: 409,
      };
    }
    else{
      const response = await createUser(userDetails);
    console.log("User created successfully:", response);
    return response;
    }

    
  } catch (error) {
    throw {
      message: "Error in creating user in service layer",
      originalError: error.message || error,
    };
  }
};

const getUserById = async(id)=>{
  try{
      const response = await searchById(id);
      return response;
  }
   catch (error) {
    throw {
      message: "Error in searching user in service layer",
      originalError: error.message || error,
    };
  }
}
module.exports = {
  createUserFromService,
  getUserById,
};
