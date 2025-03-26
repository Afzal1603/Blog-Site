import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
const DashComment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) return;

    let isMounted = true;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/comment/getcomments`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        console.log(res.data);
        if (isMounted) {
          setComments(res.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async () => {
    try {
      setShowModal(false);
      const res = await axios.delete(
        `http://localhost:5000/comment/deletecomment/${commentToDelete}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentToDelete)
        );
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
      {currentUser?.isAdmin && comments.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Comment Content</Table.HeadCell>
            <Table.HeadCell>Number of Likes</Table.HeadCell>
            <Table.HeadCell>POSTID</Table.HeadCell>
            <Table.HeadCell>USERID</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {comments.map((comment) => (
              <Table.Row key={comment._id}>
                <Table.Cell>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{comment.content}</Table.Cell>
                <Table.Cell>{comment.likesCount}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell
                  onClick={() => {
                    setCommentToDelete(comment._id);
                    setShowModal(true);
                  }}
                  className="font-medium text-red-500 hover:underline hover:cursor-pointer"
                >
                  Delete
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No comments to show.</p>
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

export default DashComment;
