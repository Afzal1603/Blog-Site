const express = require("express");
const commentRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createComment,
  getComments,
} = require("../controllers/comment.controller");

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/getcomment/:postId", verifyToken, getComments);

module.exports = commentRouter;
