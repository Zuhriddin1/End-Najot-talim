import { configureStore } from "@reduxjs/toolkit";
import auth from "../redux/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: auth,
  },
});