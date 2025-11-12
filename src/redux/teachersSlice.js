import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeachers } from "../firebaseTeachers";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const data = await getTeachers();
    return data;
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [],
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default teachersSlice.reducer;
