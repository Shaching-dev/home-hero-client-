import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const Registration = () => {
  const [show, setShow] = useState(false);
  const { createUser, updateUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();

  const handleEmailPasswordRegister = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const photo = event.target.photo.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!nameRegex.test(name)) {
      toast.error("Name must be at least 3 characters and letters only!");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, include at least 1 uppercase letter and 1 number!"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        event.target.reset();

        updateUser(name, photo)
          .then(() => {
            toast.success("Registration successful! Now Login");
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          })
          .catch((err) => toast.error("Profile update failed: " + err.message));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered!");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen   flex items-center justify-center p-6">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join us and get started today!
        </p>

        <form onSubmit={handleEmailPasswordRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Shaching..."
              className="input input-bordered w-full bg-white focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="https://..."
              className="input input-bordered w-full bg-white focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="input input-bordered w-full bg-white focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-white focus:ring-2 focus:ring-indigo-400 pr-10"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-4 bottom-3 text-gray-500 cursor-pointer">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-4">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google login */}
        <button
          onClick={handleLoginWithGoogle}
          type="button"
          className="btn w-full bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-100">
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2">
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
