const { searchByEmail } = require("../repository/userrepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECREAT_KEY } = require("../config/serverconfig");

const login = async (userdetails) => {
   console.log(JWT_SECREAT_KEY);
  try {
    const { email, password } = userdetails;

    const verifyUser = await searchByEmail(email);
   
      if (!verifyUser) {
      throw { message: "User not found for this email. Try again with another email.", statusCode: 404 };
    }

   
    const isPasswordMatch = await bcrypt.compare(password, verifyUser.password);
    if (!isPasswordMatch) {
      throw { message: "Incorrect password. Please enter the correct password.", statusCode: 401 };
    }

    const token = jwt.sign(
      { userId: verifyUser._id, email: verifyUser.email,role:verifyUser.role },
      JWT_SECREAT_KEY,
      { expiresIn: '7d' }
    );

    return {
      token,
      message: "User login successfully",
      userId: verifyUser._id,
      email: verifyUser.email,
    };

  } catch (error) {
    throw {
      message: error.message || "User not authenticated",
      statusCode: error.statusCode || 500,
    };
  }
};

module.exports = {
  login
};
