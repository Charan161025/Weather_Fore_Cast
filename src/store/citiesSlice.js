import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CITIES } from "../utils/constants";

const loadCities = () => {
  try {
    return JSON.parse(localStorage.getItem("wx_cities") || "null") || DEFAULT_CITIES;
  } catch {
    return DEFAULT_CITIES;
  }
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: loadCities(),
  reducers: {
    addCity(state, action) {
      const { lat, lon } = action.payload;
      const exists = state.some((c) => `${c.lat},${c.lon}` === `${lat},${lon}`);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("wx_cities", JSON.stringify(state));
      }
    },
    removeCity(state, action) {
      const key = action.payload;
      const next = state.filter((c) => `${c.lat},${c.lon}` !== key);
      localStorage.setItem("wx_cities", JSON.stringify(next));
      return next;
    },
  },
});

export const { addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;