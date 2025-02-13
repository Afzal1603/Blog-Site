const userRouter = require("express").Router();
const signUp = require("../controllers/user.controller");

userRouter.post("/signup", signUp);

module.exports = userRouter;
