import { useState, useEffect, useRef } from "react";
import { searchCities } from "../utils/api";


export function useSearch(debounceMs = 400) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }
    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchCities(query);
        setResults(data);
      } catch {
        setResults([]);
      }
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  const clearResults = () => {
    setResults([]);
    setQuery("");
  };

  return { query, setQuery, results, clearResults };
}