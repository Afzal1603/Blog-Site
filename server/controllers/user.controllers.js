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

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(500, "User is not authenticated"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const usersWithoutPass = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      success: true,
      users: usersWithoutPass,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};
const delete_User = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.adminId) {
    return next(errorHandler(403, "Unauthenticated"));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
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

module.exports = { update, deleteUser, getUsers, delete_User };
