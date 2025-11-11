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

    // Validation regex
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
        console.log(result.user);
        event.target.reset();

        updateUser(name, photo)
          .then(() => {
            toast.success("Registration successful! Now Login");

            setTimeout(() => {
              navigate("/login");
            }, 1500);
          })
          .catch((err) => {
            toast.error("Profile update failed: " + err.message);
          });
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
        console.log(result.user);
        toast.success("Google login successful!");
        navigate("/"); // redirect after Google login
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <ToastContainer position="top-center" />
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <div className="card bg-base-100 w-[450px] shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleEmailPasswordRegister}>
              <fieldset className="fieldset">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Shaching..."
                  required
                />

                {/* Photo */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  name="photo"
                  placeholder="Photo URL"
                />

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                  required
                />

                {/* Password */}
                <label className="text-left text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute bottom-[13px] right-[20px] cursor-pointer z-50">
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>

                {/* Email/Password Register */}
                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>

                {/* Google login */}
                <button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  className="btn bg-white text-black border-[#e5e5e5] mt-2">
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
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
                  Login with Google
                </button>

                <div className="mt-2">
                  <p>
                    Already have an account? Please{" "}
                    <Link to={"/login"} className="hover:text-purple-400">
                      Login
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
