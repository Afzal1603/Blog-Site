const express = require("express");
const userRouter = express.Router();

const {
  update,
  deleteUser,
  getUsers,
  delete_User,
} = require("../controllers/user.controllers"); // Ensure this is correct
const { verifyToken } = require("../utils/verifyToken");

userRouter.put("/update/:userid", verifyToken, update);
userRouter.delete("/delete/:userid", verifyToken, deleteUser);
userRouter.delete("/deleteuser/:userId/:adminId", verifyToken, delete_User);
userRouter.get("/getusers", verifyToken, getUsers);
module.exports = userRouter;
