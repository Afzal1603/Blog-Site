import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, ArrowLeft } from "lucide-react";
import CallToAction from "../Component/CallToAction";
import CommentSection from "../Component/CommentSection";
import RecentPost from "../Component/RecentPost";
const Post = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/post/getposts?slug=${slug}`
        );
        setPost(res.data.posts[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/post/getposts?limit=3`
        );
        setRecentPost(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPost();
  }, [slug]);
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-gray-500">
        <Loader className="animate-spin" size={80} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[500px] object-cover"
        />
      )}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-200">{post.title}</h1>
        <p className="mt-2 text-lg text-zinc-300">
          Category: {post.category || "Uncategorized"}
        </p>
        <p className="mt-6 text-gray-500 leading-relaxed text-lg text-justify">
          {post.content}
        </p>
      </div>

      <div className="p-3">
        <CallToAction></CallToAction>
      </div>
      <CommentSection postId={post._id}></CommentSection>
      <h1 className="text-center mb-4 font-medium text-xl">Recent Posts</h1>
      <div className="flex flex-wrap justify-center gap-4 ">
        {recentPost &&
          recentPost.map((post) => <RecentPost key={post._id} post={post} />)}
      </div>
      <Link
        className="text-teal-500 flex items-center block font-bold mt-5"
        to="/dashboard?tab=posts"
      >
        <ArrowLeft size={30} /> <span className="">Back</span>
      </Link>
    </div>
  );
};

export default Post;
