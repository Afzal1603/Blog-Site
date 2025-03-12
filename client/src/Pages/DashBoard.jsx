import SideBar from "../Component/Sidebar";
import DashProfile from "../Component/DashProfile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
      <div className="w-full">{tab === "profile" && <DashProfile />}</div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default DashBoard;
