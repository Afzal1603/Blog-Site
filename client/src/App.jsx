import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";
import Header from "./Component/Header";
import { UpdatePost } from "./Pages/UpdatePost";
import PrivateRoute from "./Component/PrivateRoute";
import OnlyAdminRoute from "./Component/OnlyAdminRoute";
import { CreatePost } from "./Pages/CreatePost";
import Post from "./Pages/Post";
import CustomFooter from "./Component/Footer";
import Search from "./Pages/Search";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/project" element={<Projects />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />}></Route>
        </Route>
        <Route element={<OnlyAdminRoute />}>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        </Route>
        <Route path="/post/:slug" element={<Post />}></Route>
      </Routes>
      <CustomFooter />
    </>
  );
}

export default App;
