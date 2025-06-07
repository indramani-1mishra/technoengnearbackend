const jwt = require('jsonwebtoken');
const { JWT_SECREAT_KEY } = require('../config/serverconfig');
const { searchByEmail } = require('../repository/userrepository');
//const { JWT_SECREAT_KEY } = require('../config/serverconfig'); // Secret key env se lena na bhoolen

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Correct way to access cookie
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECREAT_KEY);
    req.user = {
     id:decoded._id,
     email:decoded.email,
     role:decoded.role
    }; 
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // Check if req.user exists and has a role
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({
        message: "❌ Unauthorized: You are not an admin"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "❌ Error while verifying admin access",
      error: error.message || error
    });
  }
};


module.exports = {
  isLoggedIn,
  isAdmin,
};

