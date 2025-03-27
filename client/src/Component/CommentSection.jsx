import { Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import RecentPost from "./RecentPost";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { name, email, image } = currentUser;
  const [content, setContent] = useState("");
  const [remaining, setReamining] = useState(200);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/comment/getcomment/${postId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`, // Optional chaining
            },
          }
        );

        setComments(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    if (postId) {
      fetchComments();
    }
  }, [postId, refresh]);

  const handleLike = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/comment/likecomment/${commentId}`, // ✅ Use correct ID
        {}, // Empty request body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      const updatedComment = res.data; // ✅ Directly use response data

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: updatedComment.likes,
                likesCount: updatedComment.likesCount,
              }
            : comment
        )
      );
    } catch (error) {
      console.log("Error liking comment:", error.response?.data || error);
    }
  };
  const handleDelete = async (commentId) => {
    // Optimistically remove the comment from UI
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));

    try {
      await axios.delete(
        `http://localhost:5000/comment/deletecomment/${commentId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      console.log("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const handleEdit = async (commentId, editContent) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/comment/updatecomment/${commentId}`,
        { content: editContent },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      const updatedComment = res.data; // ✅ Directly use response data

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                content: updatedComment.content,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const text = e.target.value;
    setContent(e.target.value);
    setReamining(200 - text.length);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      console.log("Comment cannot be empty");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/comment/create", // Fixed API URL
        {
          content,
          postId,
          userId: currentUser?._id, // Optional chaining to avoid crashes
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`, // Optional chaining
          },
        }
      );
      if (res.data.success) {
        setContent(""); // Clear input field
        setRefresh((prev) => !prev);
        setReamining(200);
      }
    } catch (error) {
      console.error("Error submitting comment:", error.response?.data || error);
    }
  };

  return (
    <div className="px-5">
      {name && (
        <div className="flex gap-2 items-center mt-6 mb-6">
          <span className="text-slate-400 text-sm">Signed in as :</span>
          <span className="block w-8 h-8 rounded-full overflow-hidden">
            <img src={image} alt={name} />
          </span>
          <Link to="/dashboard?tab=profile">
            <span className="text-teal-300">{email}</span>
          </Link>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border-2 p-4 rounded-xl border-slate-400"
      >
        <Textarea
          onChange={handleChange}
          maxLength={200}
          placeholder="Add a comment..."
          value={content}
        ></Textarea>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-8">
          <span className="text-sm font-light mb-2 md:mb-0">
            {remaining} characters remaining
          </span>
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Submit
          </Button>
        </div>
      </form>
      <div className="mt-4 mb-4">
        <div className="flex gap-3">
          <h1>Comments</h1>
          <span className=" border-2 border-slate-600 py-0 px-2">
            {comments.length}
          </span>
        </div>
        {comments.length === 0 ? (
          <p className="mt-4 ml-4 text-slate-500"> No comments yet!</p>
        ) : (
          comments.map((value) => (
            <Comment
              key={value._id}
              {...value}
              handleLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
