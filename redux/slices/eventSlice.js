import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../../lib/appwrite";

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  return await getEvents();
});

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
