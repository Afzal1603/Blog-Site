const express = require("express");
const commentRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createComment,
  getComments,
  likeComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/getcomment/:postId", verifyToken, getComments);
commentRouter.put("/likecomment/:commentId", verifyToken, likeComment);
commentRouter.put("/updatecomment/:commentId", verifyToken, updateComment);
commentRouter.delete("/deletecomment/:commentId", verifyToken, deleteComment);
module.exports = commentRouter;
