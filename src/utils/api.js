import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";
const GEO = "https://api.openweathermap.org/geo/1.0";


const cache = {};
const CACHE_TTL = 60_000; 

function getCached(key) {
  const entry = cache[key];
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
  return null;
}

function setCache(key, data) {
  cache[key] = { data, ts: Date.now() };
}


async function fetchWithCache(url) {
  const cached = getCached(url);
  if (cached) return cached;
  const response = await axios.get(url);
  setCache(url, response.data);
  return response.data;
}


export async function fetchCurrentWeather(lat, lon) {
  return fetchWithCache(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}

export async function fetchForecast(lat, lon) {
  return fetchWithCache(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=56`);
}


export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  return fetchWithCache(`${GEO}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`);
}