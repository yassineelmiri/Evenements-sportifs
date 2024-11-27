import { React, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Forgotpassword = () => {

    const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return toast.error("Email is required");
    }
  };
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/cinema-ia.png")})`,
      }}
    >
      <div className="w-96 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-yellow-400 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition duration-200"
          >
            Reset Password{" "}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-yellow-400 hover:underline">
          Remembered your password? 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forgotpassword