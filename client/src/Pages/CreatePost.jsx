import axios from "axios";
import { FileInput, Select, TextInput, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
export const CreatePost = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImg(file);
      console.log("Selected File:", img);
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
      console.log(res.data.secure_url);
      setImgUrl(res.data.secure_url);
      setPostData((prev) => ({ ...prev, image: res.data.secure_url }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(imgUrl);

    console.log(postData);
    const res = await axios.post(
      "http://localhost:5000/post/create",
      postData,
      {
        withCredentials: true, // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    console.log(res.data);
    toast.success("Post created successfully");
  };
  const handleClick = () => {
    uploadImage(img);
  };
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3 ">
      <h1 className="text-3xl mt-3 mb-3 text-center">Create a post</h1>
      <form onSubmit={handleSubmit} className="mx-8">
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-between">
          <TextInput
            className="flex-1"
            placeholder="Title"
            required
            name="title"
            type="text"
            id="title"
            onChange={handlePostData}
          ></TextInput>
          <Select name="category" onChange={handlePostData}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="react">React</option>
          </Select>
        </div>
        <div className="flex justify-between gap-4 mt-4 border-4 border-dotted p-4 border-gray-400">
          <FileInput
            accept="image/*"
            name="image"
            type="file"
            className="flex-1 max-w-md"
            onChange={handleFileChange}
          />
          <Button gradientDuoTone="pinkToOrange" outline onClick={handleClick}>
            {loading ? <Loader className="animate-spin" /> : "Upload"}
          </Button>
        </div>
        <Textarea
          className="min-h-[200px] border rounded-md mt-4 p-2 mb-4"
          placeholder="Write something..."
          required
          name="content"
          type="text"
          id="content"
          onChange={handlePostData}
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
