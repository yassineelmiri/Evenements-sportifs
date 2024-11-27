import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { toast, ToastContainer  } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      return toast.error("Username is required");
    }
    if (email.trim() === "") {
      return toast.error("Email is required");
    }
    if (password.trim() === "") {
      return toast.error("Password is required");
    }
    setUsername("");
    setEmail("");
    setPassword("");

    toast.success("Verification your Email");

    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (registerMessage) {
      swal({
        title: registerMessage,
        icon: "success",
      }).then((isOk) => {
        if (isOk) {
          navigate("/");
        }
      });
    }
  }, [registerMessage, navigate]);
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/cinema-ia.png")})`,
      }}
    >
      <ToastContainer />
      {" "}
      <div className="bg-gray-800 bg-opacity-80 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Sign Up
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-opacity-80 p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-opacity-80 p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-opacity-80 p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Already have an account? </span>
          <Link to="/signin" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
