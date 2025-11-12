import { createSlice } from "@reduxjs/toolkit";

const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavorites,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
