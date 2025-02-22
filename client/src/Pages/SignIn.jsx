import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill out all fields");
    }

    try {
      dispatch(signInStart());
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: email.trim(),
          password: password.trim(),
        },
        { withCredentials: true }
      );

      dispatch(signInSuccess(response.data));
      setEmail("");
      setPassword("");
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      dispatch(
        signInFailure(error.response?.data?.message || "Sign-in failed")
      );
      toast.error(
        error.response?.data?.message || "Sign-in failed. Please try again."
      );
    }
  };
  return (
    <div className="mx-8 md:mx-20 h-full mt-20 md:mt-40 flex gap-10 flex-col justify-center md:flex-row">
      <div className="flex-1">
        <Link to="/">
          <span className="text-4xl mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 font-bold text-white rounded-lg">
            Blog-Site
          </span>
          <p className="text-sm mt-6 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            error exercitationem deserunt repudiandae aut sit harum repellendus,
            ipsa nihil magnam velit vel! Vitae quasi soluta eos.
          </p>
        </Link>
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label>Your Email</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
            />
          </div>
          <div className="mb-3 relative">
            <Label>Your Password</Label>
            <TextInput
              className="w-full pr-10"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <Button
            type="submit"
            className="w-full flex items-center justify-center"
            gradientDuoTone="purpleToPink"
            disabled={loading}
          >
            <motion.span>
              {loading ? <Loader className="animate-spin w-5 h-5" /> : "Submit"}
            </motion.span>
          </Button>
        </form>
        <div className="flex gap-2 ml-2 mt-2">
          <span>Don't have an account?</span>
          <Link className="text-blue-500" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default SignIn;
