import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowCircleLeft, HiDocument } from "react-icons/hi";
import { useSelector } from "react-redux";
const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab"));
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="md:flex md:flex-col md:gap-0.5">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              label={currentUser.isAdmin ? "Admin" : "User"}
              href="#"
              icon={HiUser}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=posts"}>
            <Sidebar.Item active={tab === "posts"} icon={HiDocument} as="div">
              Posts
            </Sidebar.Item>
          </Link>
          <Link to={"/"}>
            <Sidebar.Item href="#" icon={HiArrowCircleLeft} as="div">
              Back
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
