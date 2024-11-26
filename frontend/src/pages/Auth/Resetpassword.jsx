import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Resetpassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const formSubmitHandler = (e) => {
      e.preventDefault();
  
      if (newPassword.trim() === "") {
        return toast.error("New password is required");
      }
  
      if (confirmPassword.trim() === "") {
        return toast.error("Please confirm your password");
      }
  
      if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match");
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
          Reset Password
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow-400 mb-2"
            >
              Enter new password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow-400 mb-2"
            >
              Confirm new password
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <span className="text-sm text-white">Don't have an account? </span>
          <Link to="/" className="text-yellow-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Resetpassword