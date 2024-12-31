import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to store the ticket in the database
export const storeTicket = createAsyncThunk(
  "ticket/storeTicket",
  async (ticketInfo) => {
    const response = await fetch("https://api.example.com/buy-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to buy ticket");
    }

    const data = await response.json();
    return data;
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
