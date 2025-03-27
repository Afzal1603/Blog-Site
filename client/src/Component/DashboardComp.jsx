import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Table } from "flowbite-react";
import {
  HiUserGroup,
  HiDocument,
  HiChatBubbleBottomCenterText,
} from "react-icons/hi2";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    if (!currentUser?.isAdmin) return;

    const fetchData = async () => {
      try {
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          axios.get("http://localhost:5000/post/getposts?limit=5", {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }),
          axios.get("http://localhost:5000/user/getusers?limit=5", {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }),
          axios.get("http://localhost:5000/comment/getcomments?limit=5", {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }),
        ]);

        setPostCount({
          totalPosts: postsRes.data.totalPosts,
          lastMonthPosts: postsRes.data.lastMonthPosts,
        });
        setPosts(postsRes.data.posts);

        setUserCount({
          totalUsers: usersRes.data.totalUsers,
          lastMonthUsers: usersRes.data.lastMonthUsers,
        });
        setUsers(usersRes.data.users);

        setCommentCount({
          totalComments: commentsRes.data.totalComments,
          lastMonthComments: commentsRes.data.lastMonthComments,
        });
        setComments(commentsRes.data.comments);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error(error.message);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="min-h-screen px-4 mb-6">
      {!userCount ||
      !postCount ||
      !comments ||
      !users ||
      !posts ||
      !commentCount ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="w-full flex flex-wrap gap-4 justify-center mt-6 mx-auto">
            <Card1
              icon={<HiUserGroup />}
              count={userCount.totalUsers}
              lastMonth={userCount.lastMonthUsers}
              name="TOTAL USERS"
            />
            <Card1
              icon={<HiDocument />}
              count={postCount.totalPosts}
              lastMonth={postCount.lastMonthPosts}
              name="TOTAL POSTS"
            />
            <Card1
              icon={<HiChatBubbleBottomCenterText />}
              count={commentCount.totalComments}
              lastMonth={commentCount.lastMonthComments}
              name="TOTAL COMMENTS"
            />
          </div>
          <div className="w-full flex flex-wrap gap-4 justify-center mt-6 mx-auto">
            <Card2 users={users}></Card2>
            <Card3 comments={comments} />
            <Card4 posts={posts} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardComp;
