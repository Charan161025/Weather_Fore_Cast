import { createSlice } from "@reduxjs/toolkit";

const loadUnit = () => localStorage.getItem("wx_unit") || "C";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    unit: loadUnit(), 
  },
  reducers: {
    setUnit(state, action) {
      state.unit = action.payload;
      localStorage.setItem("wx_unit", action.payload);
    },
  },
});

export const { setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;