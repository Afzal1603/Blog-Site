const express = require("express");
const postRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const { createPost } = require("../controllers/post.controller");
postRouter.post("/create", verifyToken, createPost);

module.exports = postRouter;
