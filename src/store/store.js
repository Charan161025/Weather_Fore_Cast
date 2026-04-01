import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import favoritesReducer from "./favoritesSlice";
import settingsReducer from "./settingsSlice";
import citiesReducer from "./citiesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
    cities: citiesReducer,
  },
});