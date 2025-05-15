import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { Textarea, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
dayjs.extend(relativeTime);

const Comment = ({
  _id,
  userId,
  content,
  createdAt,
  likesCount,
  handleLike,
  likes,
  onEdit,
  onDelete,
}) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/getuser/${userId}`);
        setUser(res.data.user[0]);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);
  const handleEdit = () => {
    setIsEdit(true);
  };

  if (loading) {
    return <div className="p-4">Loading comment...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="p-4">User not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 ml-4 mb-4 border-b pb-2 border-slate-300 dark:border-slate-500">
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={user.image || "/default-avatar.png"}
          alt={`${user.email}'s avatar`}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-sm mb-2 font-bold flex flex-col md:flex-row gap-1 md:gap-2">
          @{user.email}
          <span className="font-light italic text-slate-400 text-xs">
            {dayjs(createdAt).fromNow()}
          </span>
        </h1>

        {isEdit ? (
          <form className="max-w-96 mt-2">
            <Textarea
              onChange={(e) => setEditContent(e.target.value)}
              value={editContent}
            />
            <div className="flex gap-2 justify-end mt-2 mr-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(_id, editContent);
                  setIsEdit(false);
                }}
                type="submit"
                className="w-14 h-8 flex items-center"
                gradientDuoTone="purpleToBlue"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEdit(false)}
                className="w-14 h-8 flex items-center"
                color="failure"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-sm">{content}</p>

            <div className="ml-2 flex gap-4 border-t border-slate-300 dark:border-slate-500 mt-2 pt-2 w-fit font-light text-sm">
              <span className="flex gap-2 items-center">
                <button
                  className={`hover:text-blue-500 ${
                    currentUser && likes.includes(currentUser._id)
                      ? "text-blue-500"
                      : ""
                  }`}
                  onClick={() => handleLike(_id)}
                >
                  <BiSolidLike size={20} />
                </button>
                {`${likesCount} Likes`}
              </span>
              {((currentUser && currentUser._id === userId) ||
                currentUser.isAdmin) && (
                <button onClick={handleEdit} className="hover:text-blue-500">
                  Edit
                </button>
              )}
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
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
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  outline
                  onClick={() => {
                    onDelete(_id);
                    setShowModal(false);
                  }}
                >
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
    </div>
  );
};

export default Comment;
