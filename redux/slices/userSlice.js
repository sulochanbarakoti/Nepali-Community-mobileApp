import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, signInUser, signOut } from "../../lib/appwrite";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await getCurrentUser();
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await signInUser(credentials.email, credentials.password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("User logged in:", action.payload);
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login failed:", action.payload);
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
