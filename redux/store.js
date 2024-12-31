import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice";
import ticketReducer from "./slices/ticketSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    ticket: ticketReducer,
  },
});

export default store;
