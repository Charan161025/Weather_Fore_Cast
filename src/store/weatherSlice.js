import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather, fetchForecast } from "../utils/api";



export const loadCurrentWeather = createAsyncThunk(
  "weather/loadCurrent",
  async ({ lat, lon }) => {
    const data = await fetchCurrentWeather(lat, lon);
    return { key: `${lat},${lon}`, data, ts: Date.now() };
  }
);

export const loadForecast = createAsyncThunk(
  "weather/loadForecast",
  async ({ lat, lon }) => {
    const data = await fetchForecast(lat, lon);
    return { key: `${lat},${lon}`, data };
  }
);



const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: {},   
    forecasts: {}, 
  },
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(loadCurrentWeather.pending, (state, action) => {
        const { lat, lon } = action.meta.arg;
        state.current[`${lat},${lon}`] = { loading: true, error: null };
      })
      .addCase(loadCurrentWeather.fulfilled, (state, action) => {
        const { key, data, ts } = action.payload;
        state.current[key] = { data, ts, loading: false, error: null };
      })
      .addCase(loadCurrentWeather.rejected, (state, action) => {
        const { lat, lon } = action.meta.arg;
        state.current[`${lat},${lon}`] = { loading: false, error: action.error.message };
      });

    
    builder
      .addCase(loadForecast.pending, (state, action) => {
        const { lat, lon } = action.meta.arg;
        state.forecasts[`${lat},${lon}`] = { loading: true, error: null };
      })
      .addCase(loadForecast.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.forecasts[key] = { data, loading: false, error: null };
      })
      .addCase(loadForecast.rejected, (state, action) => {
        const { lat, lon } = action.meta.arg;
        state.forecasts[`${lat},${lon}`] = { loading: false, error: action.error.message };
      });
  },
});

export default weatherSlice.reducer;