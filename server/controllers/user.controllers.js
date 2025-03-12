const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");

const update = async (req, res, next) => {
  const { userid } = req.params;

  // Check if the user is authorized
  if (req.user.id !== userid) return next(errorHandler(401, "Unauthorized"));

  // Password validation
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  // Username validation
  if (req.body.name) {
    if (req.body.name.length < 3 || req.body.name.length > 20) {
      return next(
        errorHandler(400, "Username should be between 3 and 20 characters")
      );
    }
    if (req.body.name.includes(" ")) {
      return next(errorHandler(400, "Username should not contain spaces"));
    }
    if (!/^[a-zA-Z0-9]+$/.test(req.body.name)) {
      return next(
        errorHandler(
          400,
          "Username should only contain alphanumeric characters"
        )
      );
    }
  }

  try {
    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        $set: {
          email: req.body.email,
          password: req.body.password || undefined, // Only update if password is provided
          name: req.body.name,
          image: req.body.image,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    return res.status(200).json({
      success: true,
      user: { ...updatedUser._doc, password: undefined }, // Exclude password from response
    });
  } catch (error) {
    return next(errorHandler(500, "Failed to update user"));
  }
};
const deleteUser = async (req, res, next) => {
  const { userid } = req.params;

  // Check if the user is authorized
  if (req.user.id !== userid) return next(errorHandler(401, "Unauthorized"));

  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(errorHandler(500, "Failed to delete user"));
  }
};

module.exports = { update, deleteUser };
