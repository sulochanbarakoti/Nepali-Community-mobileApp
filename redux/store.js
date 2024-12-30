import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
});

export default store;
