const  UserModel = require("../schema/usershema")

const createUser = async (userdetails) => {
  try {
    const response = await UserModel.create(userdetails);
    console.log("Repository Created User:", response);
    return response;
  } catch (error) {
    console.error("Repository Error:", error); // helpful for debugging
    throw {
      message: "Error in creating user in repository",
      originalError: error.message || error,
    };
  }
};

const searchByEmail = async (email) => {
  try {
    const response = await UserModel.findOne({ email: email });
    return response; // response can be null (and that’s okay)
  } catch (error) {
    throw {
      message: "Error in searching in repository layer",
      originalError: error.message || error,
    };
  }
};
const searchById = async (id) => {
  try {
    const response = await UserModel.findById(id);
    return response; // response can be null (and that’s okay)
  } catch (error) {
      throw error
  }
};




module.exports={
    createUser,
    searchByEmail,
    searchById
}

