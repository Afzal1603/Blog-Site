const express = require("express");
const postRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/post.controller");
postRouter.post("/create", verifyToken, createPost);
postRouter.get("/getposts", getPosts);
postRouter.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
module.exports = postRouter;
