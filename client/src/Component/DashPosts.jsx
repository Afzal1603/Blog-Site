import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const handleBtnClick = async () => {
    const startIndex = posts.length;
    const res = await axios.get(
      `http://localhost:5000/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
    );
    setShowPosts(res.data.post < 9);
    setPosts((prev) => [...prev, ...res.data.posts]);
  };
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) return;

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/post/getposts?userId=${currentUser._id}`
        );
        if (isMounted) {
          setShowPosts(res.data.posts.length > 9);

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
    <div className="table-auto overflow-x-sc md:mx-auto p-3 scrollbar">
      {currentUser?.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {posts.map((post) => (
                <Table.Row key={post._id}>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-30 h-16 object-cover md:object-contain"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="font-medium">
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell className="font-medium text-red-500 hover:underline hover:cursor-pointer">
                    Delete
                  </Table.Cell>
                  <Table.Cell className="font-medium text-teal-500 hover:underline hover:cursor-pointer">
                    Edit
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showPosts && (
            <button
              onClick={handleBtnClick}
              className="w-full text-teal-500 self-center"
            >
              show more
            </button>
          )}
        </>
      ) : (
        <p>No Post to show.</p>
      )}
    </div>
  );
};

export default DashPosts;
