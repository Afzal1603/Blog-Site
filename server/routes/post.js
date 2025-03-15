const express = require("express");
const postRouter = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const { createPost, getPosts } = require("../controllers/post.controller");
postRouter.post("/create", verifyToken, createPost);
postRouter.get("/getposts", getPosts);

module.exports = postRouter;
