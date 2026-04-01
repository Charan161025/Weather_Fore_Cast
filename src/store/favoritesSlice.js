import { createSlice } from "@reduxjs/toolkit";

const loadFavs = () => {
  try {
    return JSON.parse(localStorage.getItem("wx_favorites") || "[]");
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavs(),
  reducers: {
    toggleFavorite(state, action) {
      const key = action.payload;
      const idx = state.indexOf(key);
      if (idx === -1) {
        state.push(key);
      } else {
        state.splice(idx, 1);
      }
      
      localStorage.setItem("wx_favorites", JSON.stringify(state));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;