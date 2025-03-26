import SideBar from "../Component/Sidebar";
import DashProfile from "../Component/DashProfile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashPosts from "../Component/DashPosts";
import { ToastContainer } from "react-toastify";
import DashUsers from "../Component/DashUsers";
import DashComment from "../Component/DashComment";
function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab"));
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <SideBar></SideBar>
      </div>
      <div className="w-full overflow-x-scroll">
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "users" && <DashUsers />}
        {tab === "comments" && <DashComment />}
      </div>
      {/* <div className="w-full"></div> */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default DashBoard;
