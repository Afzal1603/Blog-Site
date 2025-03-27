import { Link } from "react-router-dom";
import CallToAction from "../Component/CallToAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import RecentPost from "../Component/RecentPost";

function Home() {
  const [posts, setPosts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) return;

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/post/getposts?limit=9`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );

        if (isMounted) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  return (
    <div className="min-h-screen  py-20 flex flex-col items-start justify-center  px-6 text-left">
      <div className="max-w-auto md:text-left text-center py-10 ">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl text-gray-400 leading-tight">
          Welcome to My Blog
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-500 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus fuga
          repudiandae at atque, pariatur ducimus. Ipsam nihil non fuga rem.
        </p>
        <Link
          to="/search"
          className="text-lg font-semibold text-teal-500 hover:text-teal-400 transition duration-300 hover:underline"
        >
          View All Posts
        </Link>
      </div>
      <CallToAction className="mt-10" />
      <h1 className="self-center mt-10 text-xl font-semibold">Recent Posts</h1>
      <div className="w-full mt-6 flex flex-wrap gap-4 justify-center">
        {!posts ? (
          <p>Loading...</p>
        ) : (
          <>
            {posts.map((post) => (
              <RecentPost key={post._id} post={post} />
            ))}
          </>
        )}
      </div>
      <Link
        className="self-center text-teal-500 text-lg hover:text-teal-400 transition duration-300 hover:underline"
        to="/search"
      >
        View all posts
      </Link>
    </div>
  );
}

export default Home;
