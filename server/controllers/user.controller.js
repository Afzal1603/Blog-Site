const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // return res
    //   .status(400)
    //   .json({ success: false, message: "All inputs fields are required" });
    return next(errorHandler(400, "All input fields are required"));
  }
  try {
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      // return res
      //   .status(400)
      //   .json({ success: false, message: "User already exists" });
      return next(errorHandler(400, "User already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    // return res.status(500).json({ success: false, message: error.message });
    return next(error);
  }
};

module.exports = signUp;
