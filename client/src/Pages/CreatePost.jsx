import axios from "axios";
import { FileInput, Select, TextInput, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const CreatePost = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const currentUser = useSelector((state) => state.user.currentUser);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgPos, setImgPos] = useState("cover");
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImg(file);
    }
  };
  const handlePostData = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const uploadImage = async (img) => {
    if (!img) return toast.error("Please select an image");
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
      setPostData((prev) => ({ ...prev, image: res.data.secure_url }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.title || !postData.content)
      return toast.error("Please fill out all fields");
    try {
      const res = await axios.post(`${API_BASE_URL}/post/create`, postData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      console.log(res.data);
      toast.success("Post created successfully");
      setPostData({ title: "", content: "" });
      navigate(`/post/${res.data.post.slug}`);
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  const handleClick = () => {
    uploadImage(img);
  };
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3 ">
      <h1 className="text-3xl mt-3 mb-6 text-center">Create a post</h1>
      <form onSubmit={handleSubmit} className="mx-8">
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-between">
          <TextInput
            className="flex-1"
            placeholder="Title"
            name="title"
            type="text"
            id="title"
            onChange={handlePostData}
            value={postData.title}
          ></TextInput>
          <Select name="category" onChange={handlePostData}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="react">React</option>
          </Select>
        </div>
        <div className="flex justify-between gap-2 mt-4 border-4 border-dotted py-4 px-2 border-gray-400">
          <FileInput
            accept="image/*"
            name="image"
            type="file"
            className="flex-1 max-w-md min-w-24"
            id="image"
            onChange={handleFileChange}
          />
          <Select
            className="min-w-20 max-w-auto"
            name="imageFit"
            onChange={(e) => setImgPos(e.target.value)}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </Select>
          <Button
            className="w-16 sm:w-auto"
            gradientDuoTone="pinkToOrange"
            outline
            onClick={handleClick}
          >
            {loading ? <Loader className="animate-spin" /> : "Upload"}
          </Button>
        </div>
        {postData.image && (
          <img
            className={`w-full h-96 mt-4 object-center ${
              imgPos === "cover" ? "object-cover" : "object-contain"
            }`}
            src={postData.image}
            alt="Uploaded Image"
          />
        )}
        <Textarea
          className="min-h-[200px] border rounded-md mt-4 p-2 mb-4"
          placeholder="Write something..."
          name="content"
          type="text"
          id="content"
          onChange={handlePostData}
          value={postData.content}
        ></Textarea>
        <Button
          className="w-full"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Publish
        </Button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};
