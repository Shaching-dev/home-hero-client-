import React, { use, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signInUser, forgotPassword, user, signInWithGoogle } =
    use(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signInUser(email, password);

      // Optional: check if user object exists
      if (user) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      // Firebase auth error handling
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("Email not found! Please register first.");
          break;
        case "auth/wrong-password":
          toast.error("Invalid password! Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format!");
          break;
        default:
          toast.error(error.message);
          break;
      }
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    forgotPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("welcome to Home-Hero", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/");
        });
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex justify-center items-center overflow-x-hidden my-10">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-[450px] px-4 py-8 ">
        <div className="backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
            🏠 HomeHero
          </h1>
          <p className="text-sm mb-6">
            Login to connect with trusted local service providers
          </p>

          <div className="bg-white text-gray-700 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Welcome Back 👋
            </h2>

            <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full input input-bordered border-gray-300 focus:border-indigo-400 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="relative text-black">
                <label className="block text-sm mb-1">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  required
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full  focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute bottom-[13px] right-[20px] cursor-pointer z-50">
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button
                className="hover:underline cursor-pointer"
                onClick={handleForgotPassword}
                type="button">
                Forget password?
              </button>

              <button
                type="submit"
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                Login
              </button>
            </form>

            <div className="flex items-center gap-2 my-5">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="text-sm text-gray-500">or</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleLoginWithGoogle}
              className="btn btn-outline w-full border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <div className="mt-4">
              <p>
                Don't have an account? Please{" "}
                <Link
                  to={"/register"}
                  className="hover:text-purple-400 hover:underline ml-1">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
