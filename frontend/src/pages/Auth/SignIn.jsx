import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return toast.error("Email is required");
    }
    if (password.trim() === "") {
      return toast.error("Password is required");
    }

    dispatch(loginUser({ email, password }));
    navigate("/Statistique");
  };

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/cinema-ia.png")})`,
      }}
    >
      <ToastContainer />

      <div className="w-96 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Sign In
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-opacity-80 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-opacity-80 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 rounded-lg font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-white">or </span>
          <Link
            to="/forgot-password"
            className="text-yellow-100 hover:underline"
          >
            Forgot Password
          </Link>
          <br />
          <span className="text-sm text-white">Don't have an account? </span>
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
