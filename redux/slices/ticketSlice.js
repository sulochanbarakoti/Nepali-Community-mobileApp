import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTicket, getTickets, updateTicket } from "../../lib/appwrite";

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

// Slice to manage the ticket state
export const getAllTickets = createAsyncThunk("ticket/getTickets", async () => {
  const response = await getTickets();
  return response;
});

export const markTicketAsUsed = createAsyncThunk(
  "ticket/markTicketAsUsed",
  async (ticketId) => {
    const response = await updateTicket(ticketId, { scanned: true });
    return response;
  }
);

// export const scanTicket = createAsyncThunk(
//   "ticket/scanTicket",
//   async (ticketId) => {
//     const response = await updateTicket(ticketId, { scanned: true });
//     return response;
//   }
// );

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
        console.log(action.payload);
        state.tickets.push(action.payload);
      })
      .addCase(storeTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(scanTicket.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(scanTicket.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.tickets = action.payload;
      // })
      // .addCase(scanTicket.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
      .addCase(markTicketAsUsed.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (ticket) => ticket.$id === action.payload.$id
        );
        if (index !== -1) {
          state.tickets[index].scanned = true;
        }
      });
  },
});

export default ticketSlice.reducer;
