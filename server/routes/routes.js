const authRouter = require("express").Router();
// const { signIn, signUp } = require("../controllers/user.controller");
const { signIn, signUp } = require("../controllers/user.controller");

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

module.exports = authRouter;
