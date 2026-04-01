import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { fmt, wIcon, msToKmh } from "../utils/helpers";

const styles = {
  card: {
    background: "#0c1e35",
    border: "1px solid #1a3050",
    borderRadius: "16px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.25s",
    position: "relative",
    overflow: "hidden",
  },
  loading: {
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b90b0",
  },
  pulse: {
    animation: "pulse 1.5s ease-in-out infinite",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  cityName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#e8f4ff",
  },
  cityCountry: {
    fontSize: "12px",
    color: "#6b90b0",
    marginTop: "2px",
  },
  favBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px",
    lineHeight: 1,
  },
  temp: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "48px",
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: "8px",
    background: "linear-gradient(135deg, #e8f4ff, #00d4ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  condition: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  conditionText: {
    fontSize: "14px",
    color: "#6b90b0",
    textTransform: "capitalize",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px",
  },
  stat: {
    background: "#081428",
    borderRadius: "8px",
    padding: "8px",
    textAlign: "center",
  },
  statVal: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#e8f4ff",
  },
  statLbl: {
    fontSize: "10px",
    color: "#6b90b0",
    marginTop: "2px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  lastUpdated: {
    fontSize: "10px",
    color: "#6b90b0",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  liveDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    background: "#00e5a0",
    borderRadius: "50%",
    animation: "blink 2s infinite",
  },
  errorBadge: {
    background: "rgba(255, 100, 100, 0.1)",
    border: "1px solid rgba(255, 100, 100, 0.3)",
    color: "#ff8080",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "12px",
  },
};

export default function CityCard({ city, onClick }) {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);
  const favorites = useSelector((state) => state.favorites);
  const key = `${city.lat},${city.lon}`;
  const entry = useSelector((state) => state.weather.current[key]);
  const isFav = favorites.includes(key);

  const handleFav = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(key));
  };

  return (
    <div style={styles.card} onClick={onClick}>
      {/* Loading */}
      {!entry && (
        <div style={styles.loading}>
          <span style={styles.pulse}>Loading…</span>
        </div>
      )}

      {/* Error */}
      {entry?.error && (
        <>
          <div style={styles.cardTop}>
            <div>
              <div style={styles.cityName}>{city.name}</div>
            </div>
            <button style={styles.favBtn} onClick={handleFav}>
              {isFav ? "⭐" : "☆"}
            </button>
          </div>
          <div style={styles.errorBadge}>
            ⚠️ API key required — add your OpenWeatherMap key to <code>.env</code>
          </div>
        </>
      )}

      {/* Loaded */}
      {entry?.data && (
        <>
          <div style={styles.cardTop}>
            <div>
              <div style={styles.cityName}>{city.name}</div>
              <div style={styles.cityCountry}>{entry.data.sys?.country}</div>
            </div>
            <button style={styles.favBtn} onClick={handleFav} title="Toggle favourite">
              {isFav ? "⭐" : "☆"}
            </button>
          </div>

          <div style={styles.temp}>{fmt(entry.data.main.temp, unit)}</div>

          <div style={styles.condition}>
            <img
              src={wIcon(entry.data.weather[0].icon)}
              alt={entry.data.weather[0].description}
              style={{ width: "32px", height: "32px" }}
            />
            <span style={styles.conditionText}>{entry.data.weather[0].description}</span>
          </div>

          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statVal}>{entry.data.main.humidity}%</div>
              <div style={styles.statLbl}>Humidity</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statVal}>{msToKmh(entry.data.wind.speed)}</div>
              <div style={styles.statLbl}>km/h</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statVal}>{entry.data.main.pressure}</div>
              <div style={styles.statLbl}>hPa</div>
            </div>
          </div>

          <div style={styles.lastUpdated}>
            <span style={styles.liveDot} />
            Updated {new Date(entry.ts).toLocaleTimeString()}
          </div>
        </>
      )}
    </div>
  );
}