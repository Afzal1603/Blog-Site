import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters();
    try {
      const result = await signInWithPopup(auth, provider);
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };
      console.log(data);
      dispatch(signInStart());
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        data,
        { withCredentials: true }
      );
      if (!response.data.success) {
        dispatch(signInFailure());
      }
      console.log(response.data.user);
      dispatch(signInSuccess(response.data.user));
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      className="w-full mt-3"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-2" />
      Sign In with Google
    </Button>
  );
};

export default OAuth;
