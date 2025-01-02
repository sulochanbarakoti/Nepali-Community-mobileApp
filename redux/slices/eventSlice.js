import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../../lib/appwrite";
import { createEvent } from "../../lib/appwrite";

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  return await getEvents();
});

export const createNewEvent = createAsyncThunk(
  "event/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await createEvent(eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      })
      .addCase(createNewEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      });
  },
});

export default eventSlice.reducer;
