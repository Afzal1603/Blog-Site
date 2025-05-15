import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Modal, Button } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

import { ImCross, ImCheckmark } from "react-icons/im";

import { toast, ToastContainer } from "react-toastify";

const DashUsers = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleBtnClick = async () => {
    const startIndex = users.length;
    const res = await axios.get(
      `${API_BASE_URL}/user/getusers?startIndex=${startIndex}`
    );
    setShowUsers(res.data.post < 9);
    setUsers((prev) => [...prev, ...res.data.users]);
  };
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) return;

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/getusers`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        if (isMounted) {
          setShowUsers(res.data.users.length > 9);
          setUsers(res.data.users);
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
    setShowModal(false);
    try {
      setShowModal(false);
      const res = await axios.delete(
        `${API_BASE_URL}/user/deleteuser/${userToDelete}/${currentUser._id}`,
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
        setUsers((prev) => prev.filter((user) => user._id !== userToDelete));
      } else {
        toast.error("User can't be deleted");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
      setShowModal(false);
    }
  };

  return (
    <div className="table-auto overflow-x-sc md:mx-auto p-3 scrollbar">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-10 h-10 md:w-20 md:h-20 object-cover md:object-contain rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <ImCheckmark color="green" />
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      setUserToDelete(user._id);
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

          {showUsers && (
            <button
              onClick={handleBtnClick}
              className="w-full text-teal-500 self-center"
            >
              show more
            </button>
          )}
        </>
      ) : (
        <p>No users to show.</p>
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
            <div className=" text-center">
              <HiOutlineExclamationCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete your account?
              </h3>
              <div className=" flex justify-center gap-4">
                <Button color="failure" outline onClick={handleDelete}>
                  Yes, I am sure
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

export default DashUsers;
