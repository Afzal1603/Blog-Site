import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

  const handleDelete = async () => {
    try {
      setShowModal(false);
      const res = await axios.delete(
        `http://localhost:5000/post/deletepost/${postToDelete}/${currentUser._id}`,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setPosts((prev) => prev.filter((post) => post._id !== postToDelete));
      } else {
        toast.error("Post can't be deleted");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
      setShowModal(false);
    }
  };

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
                  <Table.Cell
                    onClick={() => {
                      setPostToDelete(post._id);
                      setShowModal(true);
                    }}
                    className="font-medium text-red-500 hover:underline hover:cursor-pointer"
                  >
                    Delete
                  </Table.Cell>
                  <Table.Cell className="font-medium text-teal-500 hover:underline hover:cursor-pointer">
                    <Link to={`/update-post/${post._id}`}>Edit</Link>
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

      {showModal && (
        <Modal
          show={showModal}
          size="md"
          onClose={() => setShowModal(false)}
          popup={true}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" outline onClick={handleDelete}>
                  Yes,I am sure
                </Button>
                <Button
                  color="gray"
                  outline
                  onClick={() => setShowModal(false)}
                >
                  {" "}
                  No,Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default DashPosts;
