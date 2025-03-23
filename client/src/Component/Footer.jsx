import { Footer } from "flowbite-react";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function CustomFooter() {
  return (
    <Footer
      container
      className="border-t p-6 transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 mt-6 md:mt-0"
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <Link to="/">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 font-semibold text-white rounded-lg">
            Blog-Site
          </span>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Where Words Create Worlds.
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-2 text-sm">
          &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </Footer>
  );
}
