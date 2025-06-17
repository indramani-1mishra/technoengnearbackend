const { login } = require("../service/loginservice");

const LoginController = async (req, res) => {
  try {
    const response = await login({
      email: req.body.email,
      password: req.body.password,
    });

    if (response) {
       res.cookie("token", response.token, {
      httpOnly: true,
       secure: true,        // ✅ Render par ye zaroori hai
      sameSite: "None",    // ✅ cross-site cookie allow karne ke liye
      maxAge: 7 * 24 * 60 * 60 * 1000,
});


      return res.status(201).json({
        message: response.message,
        userid: response.userId,
        email: response.email,
        status: 201,
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Error in user login in controller",
      error: error.message,
      data: {},
      status: 404,
    });
  }
};


module.exports = {
  LoginController
};
