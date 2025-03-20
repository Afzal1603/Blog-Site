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

const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };
    const posts = await Post.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments(query);
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res
      .status(200)
      .json({ success: true, posts, totalPosts, lastMonthPosts });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

const deletePost = async (req, res, next) => {
  console.log("Request user:", req.user); // ✅ Debugging step
  console.log("Params:", req.params);

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "User not authenticated"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);

    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
module.exports = { createPost, getPosts, deletePost };
