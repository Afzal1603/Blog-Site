import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
function Header() {
  return (
    <Navbar style={{ background: "white" }} className="border-2">
      <Link to="/">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 font-semibold text-white rounded-lg">
          Home
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
        >
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button className="rounded-xl" gradientDuoTone="purpleToBlue">
            Sign Up
          </Button>
        </Link>
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
