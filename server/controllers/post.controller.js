const errorHandler = require("../utils/errorHandler");
const Post = require("../models/postModel");
const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "Unauthenticated"));
  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, "All inputs fields are required"));
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      post: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

module.exports = { createPost };
