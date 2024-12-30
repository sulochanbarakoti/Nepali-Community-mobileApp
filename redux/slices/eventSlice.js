import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    tickets: [],
  },
  reducers: {
    buyTicket: (state, action) => {
      console.log("Ticket bought:", action.payload);
      state.tickets.push(action.payload);
    },
  },
});

export const { buyTicket } = eventSlice.actions;
export default eventSlice.reducer;
