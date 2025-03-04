import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaGithub, FaInstagram, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { MainContext } from "../Context/Maincontext";
import axiosClient from "../Axios/Axios-client";

const Navbar = () => {
  const { token, user, setUser, setToken } = useContext(MainContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token, setUser]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
      navigate("/");
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/about", link: "About" },
    { path: "/blog", link: "Blog" },
    { path: "/contact", link: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-white bg-gradient-to-r from-purple-600 to-indigo-600">
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to="/" className="text-2xl font-bold">
          DEV<span className="text-yellow-300">COMMUNITY</span>
        </Link>

        <ul className="hidden space-x-8 md:flex">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="items-center hidden space-x-4 md:flex">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 pl-3 pr-10 text-gray-800 bg-white rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="absolute text-gray-600 transform -translate-y-1/2 right-2 top-1/2"
            >
              <FaSearch />
            </button>
          </form>
          {user ? (
            <>
              <span className="text-yellow-300">{user?.name}</span>
              <Link
                to="/create"
                className="transition-colors hover:text-yellow-300"
              >
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="transition-colors hover:text-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="#" className="transition-colors hover:text-yellow-300">
                <FaGithub size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-yellow-300">
                <FaInstagram size={20} />
              </a>
              <Link
                to="/login"
                className="px-4 py-2 font-semibold text-purple-700 transition-all duration-300 bg-yellow-300 rounded-full hover:bg-white hover:text-purple-600"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          {isMenuOpen ? (
            <MdOutlineClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-purple-700 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <ul className="px-4 pt-2 pb-4 space-y-2">
          <li>
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-1 pl-3 pr-10 text-gray-800 bg-white rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="absolute text-gray-600 transform -translate-y-1/2 right-2 top-1/2"
              >
                <FaSearch />
              </button>
            </form>
          </li>
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block py-2 hover:text-yellow-300 transition-colors ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                {link}
              </NavLink>
            </li>
          ))}
          {token ? (
            <>
              <li>
                <Link
                  to="/create"
                  className="block py-2 transition-colors hover:text-yellow-300"
                  onClick={toggleMenu}
                >
                  Create Post
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 text-left transition-colors hover:text-yellow-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block py-2 transition-colors hover:text-yellow-300"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
