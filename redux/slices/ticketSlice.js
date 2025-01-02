import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTicket } from "../../lib/appwrite";

// Async thunk to store the ticket in the database
export const storeTicket = createAsyncThunk(
  "ticket/storeTicket",
  async (ticketInfo, { rejectWithValue }) => {
    try {
      const response = await createTicket(ticketInfo);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeTicket.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets.push(action.payload);
      })
      .addCase(storeTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ticketSlice.reducer;
