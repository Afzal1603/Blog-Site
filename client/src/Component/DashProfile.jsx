import { Button, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "lucide-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      uploadImage(img);
    }
  };

  const uploadImage = async (img) => {
    if (!img) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "mern-blog");
    data.append("cloud_name", "dpz8bmqix");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dpz8bmqix/image/upload",
        data
      );
      setImageUrl(res.data.secure_url);
      setFormData({ ...formData, image: res.data.secure_url });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(Object.keys(formData).length);
    // console.log(currentUser._id);
    if (Object.keys(formData).length === 0) return;
    // console.log("Token being sent:", currentUser?.token);
    console.log(document.cookie);
    try {
      dispatch(updateStart());
      const response = await axios.put(
        `http://localhost:5000/user/update/${currentUser._id}`,
        formData,
        {
          withCredentials: true, // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(updateSuccess(response.data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(updateFailure());
      console.log(error);
    }
  };
  const handleDelete = async () => {
    console.log(currentUser._id);
    try {
      const res = await axios.delete(
        `http://localhost:5000/user/delete/${currentUser._id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(res.data);
      dispatch(updateSuccess(null));
      toast.success(res.data.message);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signout",
        {},
        { withCredentials: true } // ✅ Ensures cookies are included
      );

      toast.success(res.data.message);
      dispatch(updateSuccess(null));

      navigate("/signin");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };
  return (
    <div className="max-w-lg w-full mx-auto flex flex-col h-full  ">
      <h1 className="text-center my-4 text-3xl">Profile</h1>
      <form onSubmit={handleUpdateProfile} className="flex flex-col mx-8 gap-3">
        <input
          className="hidden"
          accept="image/*"
          multiple={false}
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          ref={filePickerRef}
        />
        <div
          className="self-center w-36 h-36 rounded-full overflow-hidden border-8 border-zinc-500 relative"
          onClick={() => filePickerRef.current.click()}
        >
          {loading && (
            <Loader className="absolute w-12 h-12 top-10 text-purple-300 left-10 animate-spin" />
          )}
          <img
            className={`w-full h-full cursor-pointer shadow-lg object-cover  ${
              loading && "opacity-50"
            } `}
            src={imageUrl || currentUser.image}
            alt="profile"
          />
        </div>
        <TextInput
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={currentUser.name}
          onChange={handleInputChange}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          defaultValue="**********"
          onChange={handleInputChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between text-red-500 mx-8 mt-2">
        <span
          className="cursor-pointer hover:text-red-300"
          onClick={() => setShowModal(true)}
        >
          Delete User
        </span>
        <span
          className="cursor-pointer hover:text-red-300"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
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
export default DashProfile;
