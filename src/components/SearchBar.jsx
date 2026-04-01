import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../store/citiesSlice";
import { useSearch } from "../hooks/useSearch";

export default function SearchBar({ onCityAdded }) {
  const dispatch = useDispatch();
  const { query, setQuery, results, clearResults } = useSearch();
  const wrapRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) clearResults();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [clearResults]);

  const handleSelect = (result) => {
    const city = {
      name: result.name,
      lat: result.lat,
      lon: result.lon,
      country: result.country,
    };
    dispatch(addCity(city));
    onCityAdded?.(city.name);
    clearResults();
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "300px",
        margin: "20px auto",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        🔍
      </span>

      <input
        placeholder="Search city…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 10px 10px 35px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginTop: "5px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => handleSelect(r)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>📍</span>
              <span>
                {r.name}, {r.country}
              </span>
              {r.state && (
                <span style={{ marginLeft: "auto", color: "#777" }}>
                  {r.state}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}