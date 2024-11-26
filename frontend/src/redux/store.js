import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { evenmentReducer } from "./slices/evenmentSlice";
import { participantsReducer } from "./slices/participantsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    evenment: evenmentReducer,
    participants: participantsReducer,
  },
});

export default store;
