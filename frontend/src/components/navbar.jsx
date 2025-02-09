import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        });
    }
  }, [token, setUser]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser(null);
        setToken(null);
        navigate('/');
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
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          DEV<span className="text-yellow-300">CONNECT</span>
        </Link>

        <ul className="hidden md:flex space-x-8">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors ${isActive ? 'text-yellow-300 font-semibold' : ''}`
                }
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-gray-800 rounded-full pl-3 pr-10 py-1 focus:outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
              <FaSearch />
            </button>
          </form>
          {user ? (
            <>
              <span className="text-yellow-300">{user?.name}</span>
              <Link to="/create" className="hover:text-yellow-300 transition-colors">
                Create Post
              </Link>
              <button onClick={handleLogout} className="hover:text-yellow-300 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="#" className="hover:text-yellow-300 transition-colors"><FaGithub size={20} /></a>
              <a href="#" className="hover:text-yellow-300 transition-colors"><FaInstagram size={20} /></a>
              <Link to="/login" className="bg-yellow-300 text-purple-700 rounded-full px-4 py-2 font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Sign In
              </Link>
            </>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isMenuOpen ? <MdOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden bg-purple-700 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="px-4 pt-2 pb-4 space-y-2">
          <li>
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white text-gray-800 rounded-full w-full pl-3 pr-10 py-1 focus:outline-none"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                <FaSearch />
              </button>
            </form>
          </li>
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block py-2 hover:text-yellow-300 transition-colors ${isActive ? 'text-yellow-300 font-semibold' : ''}`
                }
                onClick={toggleMenu}
              >
                {link}
              </NavLink>
            </li>
          ))}
          {token ? (
            <>
              <li><Link to="/create" className="block py-2 hover:text-yellow-300 transition-colors" onClick={toggleMenu}>Create Post</Link></li>
              <li><button onClick={handleLogout} className="block w-full text-left py-2 hover:text-yellow-300 transition-colors">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="block py-2 hover:text-yellow-300 transition-colors" onClick={toggleMenu}>Sign In</Link></li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
