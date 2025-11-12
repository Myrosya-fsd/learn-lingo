import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "./teachersSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    favorites: favoritesReducer,
  },
});
