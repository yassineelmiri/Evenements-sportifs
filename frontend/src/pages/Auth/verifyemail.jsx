import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [dispatch, userId, token]);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${require("../../assets/images/cinema-ia.png")})`,
      }}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md text-center">
        {!isEmailVerified ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-yellow-400">
              Verify Email
            </h1>
            <p className="text-gray-300 mb-6">
              Your email address has been successfully verified.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-300 transition duration-200"
            >
              Go Login
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 text-red-500">Not Found</h1>
            <p className="text-gray-300 mb-6">
              The verification link may have expired or is invalid.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-300 transition duration-200"
            >
              Go Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
