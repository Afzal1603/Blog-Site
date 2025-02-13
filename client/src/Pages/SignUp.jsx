import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "motion/react";
import { Loader } from "lucide-react";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill out all fields");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }
      );
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 md:mx-20 h-full mt-20 md:mt-40 flex gap-10 flex-col justify-center  md:flex-row ">
      <div className="flex-1">
        <Link to="/">
          <span className=" text-4xl mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 font-bold text-white rounded-lg">
            Blog-Site
          </span>
          <p className="text-sm  mt-6 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            error exercitationem deserunt repudiandae aut sit harum repellendus,
            ipsa nihil magnam velit vel! Vitae quasi soluta eos.
          </p>
        </Link>
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label>Your Name</Label>
            <TextInput
              type="text"
              id="name"
              placeholder="John Doe"
              name="name"
              onChange={(e) => setName(e.target.value.trim())}
              value={name}
            />
          </div>
          <div className="mb-3">
            <Label>Your Email</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
            />
          </div>
          <div className="mb-3">
            <Label>Your Password</Label>
            <TextInput
              className="w-full"
              type="password"
              id="password"
              placeholder="Password"
              rightIcon={FaEyeSlash}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="purpleToPink"
          >
            <motion.span>
              {loading ? <Loader className="animate-spin" /> : "Submit"}
            </motion.span>
          </Button>
        </form>
        <div className="flex gap-2 ml-2 mt-2">
          <span>Already have an account?</span>
          <Link className="text-blue-500" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
