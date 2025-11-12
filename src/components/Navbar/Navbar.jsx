import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handlePrivateRoute = (path) => {
    if (!user) {
      navigate("/login");
      toast.warn("Please log in to access this page!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setOpen(false);
      toast.success("Signed out successfully!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error signing out!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-700 hover:text-blue-600"
          }`
        }>
        <h2>Home</h2>
      </NavLink>

      <NavLink
        to="/services"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-700 hover:text-blue-600"
          }`
        }>
        Services
      </NavLink>
      {user && (
        <>
          <button
            onClick={() => handlePrivateRoute("/myServices")}
            className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all">
            My Services
          </button>
          <button
            onClick={() => handlePrivateRoute("/addServices")}
            className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all">
            Add Services
          </button>
          <button
            onClick={() => handlePrivateRoute("/myBookings")}
            className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all">
            My Bookings
          </button>
          <button
            onClick={() => handlePrivateRoute("/profile")}
            className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all">
            Profile
          </button>
        </>
      )}
    </>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-gray-800">
          <span className="text-blue-600">Home</span>Hero 🏠
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">{links}</div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 hover:scale-105 transition-all"
                onClick={() => setOpen((prev) => !prev)}
              />
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="p-3 border-b">
                    <p className="font-semibold text-gray-800 truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                  Register
                </button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 ml-3"
            onClick={() => setMobileMenu((prev) => !prev)}>
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-md animate-slideDown">
          <div className="flex flex-col items-center gap-2 py-4">{links}</div>
        </div>
      )}

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
