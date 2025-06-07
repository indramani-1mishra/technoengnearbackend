const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    });

    return res.status(200).json({
      message: "User logged out successfully",
      status: 200,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error in logout. Please try again later.",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  Logout
};
