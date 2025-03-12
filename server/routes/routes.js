const authRouter = require("express").Router();
// const { signIn, signUp } = require("../controllers/user.controller");
const {
  signIn,
  signUp,
  googleSign,
  signOut,
} = require("../controllers/user.controller");

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
authRouter.post("/google", googleSign);
module.exports = authRouter;
