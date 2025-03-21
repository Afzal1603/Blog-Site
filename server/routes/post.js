const express = require("express");
const postRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");
postRouter.post("/create", verifyToken, createPost);
postRouter.put("/update/:postId/:userId", verifyToken, updatePost);
postRouter.get("/getposts", getPosts);
postRouter.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
module.exports = postRouter;
