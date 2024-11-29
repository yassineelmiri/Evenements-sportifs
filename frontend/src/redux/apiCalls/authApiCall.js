import { authActions } from "../slices/authSlice";
import request from "../../utils/request";

//LOGINE USER
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };
}

//Logout User
export function logoutUser() {
  return async (dispatch) => {
    console.log("logout successfully!");
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

//REGISTER USER
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.Register(data.message));
      console.log("Send Email successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };
}

//Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };
}
