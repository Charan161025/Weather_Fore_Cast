# Weather Analytics Dashboard

A web-based application for displaying current weather data, forecasts, and historical trends.

## Features

- Dashboard with summary cards for multiple cities
- Detailed view with 5-7 day forecast, hourly forecast, and stats
- Search cities with autocomplete
- Favorite cities (persisted)
- Interactive charts using Recharts
- Settings to toggle Celsius/Fahrenheit

## Setup

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace 'YOUR_API_KEY' in `src/store/slices/weatherSlice.ts`
3. `npm install`
4. `npm run dev`

## Tech Stack

- React with TypeScript
- Redux Toolkit
- Recharts
- Axios
- Vite

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

