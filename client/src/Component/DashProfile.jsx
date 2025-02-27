import { Button, Spinner, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "lucide-react";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-lg w-full mx-auto flex flex-col h-full">
      <h1 className="text-center my-4 text-3xl">Profile</h1>
      <form className="flex flex-col mx-8 gap-3">
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
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          name="name"
          placeholder="Password"
          defaultValue="**********"
        ></TextInput>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between text-red-500 mx-8">
        <span className="cursor-pointer hover:text-red-300">Delete User</span>
        <span className="cursor-pointer hover:text-red-300">Sign Out</span>
      </div>
    </div>
  );
};
export default DashProfile;
