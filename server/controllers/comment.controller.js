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
const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById({ _id: req.params.commentId });
    if (!comment) {
      return next(errorHandler(403, "No comment"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likesCount += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.likesCount -= 1;
      comment.likes.splice(req.user.id, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

const updateComment = async (req, res, next) => {
  if (!req.user.isAdmin || !req.user.id) {
    return next(errorHandler(403, "Unauthorised"));
  }
  if (!req.params.commentId)
    return next(errorHandler(400, "Comment ID is required"));
  if (!req.body.content)
    return next(errorHandler(400, "Comment cannot be empty"));
  try {
    const comment = await Comment.findById({ _id: req.params.commentId });
    if (comment.userId === req.user.id || req.user.isAdmin) {
      comment.content = req.body.content;
      await comment.save();
      return res.status(200).json(comment);
    }
    return res.status(403, "Something went wrong");
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
const deleteComment = async (req, res, next) => {
  if (!req.user.isAdmin || !req.user.id) {
    return next(errorHandler(403, "Unauthorised"));
  }
  if (!req.params.commentId)
    return next(errorHandler(400, "Comment ID is required"));
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    return res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
const get_Comments = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized"));
  }

  try {
    // Extract and parse query parameters with defaults
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Build dynamic query based on request parameters
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.postId && { postId: req.query.postId }),
      ...(req.query.commentId && { _id: req.query.commentId }),
    };

    // Fetch comments based on query, sorting, and pagination
    const comments = await Comment.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .lean();

    const totalComments = await Comment.countDocuments(query);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      success: true,
      comments,
      totalComments,
      lastMonthComments,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

module.exports = {
  createComment,
  getComments,
  likeComment,
  updateComment,
  deleteComment,
  get_Comments,
};
