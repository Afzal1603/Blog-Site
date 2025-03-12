import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/theme";
import axios from "axios";
import { updateSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signout",
        {},
        { withCredentials: true } // ✅ Ensures cookies are included
      );
      // console.log("Logged out:", res.data);
      toast.success(res.data.message);
      dispatch(updateSuccess(null));

      navigate("/signin");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };
  return (
    <Navbar className="border-2">
      <Link to="/">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 font-semibold text-white rounded-lg">
          Blog-Site
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          color="gray"
          className="hidden md:inline"
        />
      </form>
      <Button className="w-12 h-10 md:hidden" color="gray" pill>
        <AiOutlineSearch className="w-20 h-5" />
      </Button>
      <div
        className="
      flex
       gap-2
       md:order-2"
      >
        <Button
          color="gray"
          className="w-12 h-10 flex justify-center items-center hidden sm:inline"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.image} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm font-mono">
                @{currentUser.name}
              </span>
              <span className="block font-semibold text-sm truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard"}>
              <Dropdown.Item>My Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button outline gradientDuoTone="purpleToBlue">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
