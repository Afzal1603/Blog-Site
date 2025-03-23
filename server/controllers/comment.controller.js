const errorHandler = require("../utils/errorHandler");
const Comment = require("../models/commentModel");
const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body;
  if (userId !== req.user.id) {
    return next(
      errorHandler(403, "You cannot add comment,you are not authorized")
    );
  }
  if (!content || !userId || !postId) {
    return next(errorHandler(403, "All values not provided"));
  }
  try {
    const comment = await Comment.create({ content, userId, postId });
    if (comment) {
      return res.status(200).json({
        success: true,
        message: "Comment added successfully",
        comment,
      });
    }
    return next(errorHandler(500, "Something went wrong"));
  } catch (error) {
    return next(errorHandler(500, error));
  }
};
const getComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    if (!comments) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Comments are fetched", comments });
  } catch (error) {
    return next(errorHandler(500, error));
  }
};

module.exports = { createComment, getComments };
