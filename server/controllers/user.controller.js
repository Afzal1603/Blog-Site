const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const setToken = require("../utils/setToken");

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
      next(errorHandler(400, "User already exists"));
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
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All input fields are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not registered"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid email or password"));
    }
    const token = setToken(res, {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { ...user._doc, password: undefined, token },
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
const signOut = async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

const googleSign = async (req, res, next) => {
  const { name, email, image } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = setToken(res, {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: { ...user._doc, password: undefined, token },
      });
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);
      username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-3);
      const user = await User.create({
        name: username,
        email,
        password: hashedPassword,
        image,
      });
      const token = setToken(res, {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { ...user._doc, password: undefined, token },
        image,
      });
    }
  } catch (error) {
    return next(error);
  }
};
module.exports = { signUp, signIn, googleSign, signOut };
