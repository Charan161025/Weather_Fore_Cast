import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadForecast } from "../store/weatherSlice";
import { fmt, wIcon, msToKmh, buildDailyData, buildHourlyChartData, hourFmt } from "../utils/helpers";
import WeatherCharts from "./WeatherCharts";

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(4, 13, 26, 0.9)",
    backdropFilter: "blur(8px)",
    zIndex: 200,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    overflowY: "auto",
    animation: "fadeIn 0.2s",
  },
  modal: {
    background: "#081428",
    border: "1px solid #1a3050",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "900px",
    padding: "32px",
    position: "relative",
    animation: "slideUp 0.25s ease",
    marginTop: "20px",
    marginBottom: "20px",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#0c1e35",
    border: "1px solid #1a3050",
    color: "#e8f4ff",
    borderRadius: "8px",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  heroIcon: {
    width: "80px",
    height: "80px",
  },
  heroCity: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#e8f4ff",
  },
  heroTemp: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "80px",
    fontWeight: 800,
    lineHeight: 1,
    background: "linear-gradient(135deg, #e8f4ff, #00d4ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroDesc: {
    color: "#6b90b0",
    fontSize: "16px",
    textTransform: "capitalize",
    marginTop: "4px",
  },
  heroRight: {
    marginLeft: "auto",
    textAlign: "right",
  },
  heroFeelsLabel: {
    color: "#6b90b0",
    fontSize: "13px",
  },
  heroFeels: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#e8f4ff",
  },
  heroHiLo: {
    color: "#6b90b0",
    fontSize: "12px",
    marginTop: "8px",
  },
  loadingRow: {
    textAlign: "center",
    color: "#6b90b0",
    padding: "20px 0",
  },
  pulse: {
    animation: "pulse 1.5s ease-in-out infinite",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "12px",
    marginBottom: "32px",
  },
  detailCard: {
    background: "#0c1e35",
    border: "1px solid #1a3050",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
  },
  detailIcon: {
    fontSize: "24px",
    marginBottom: "6px",
  },
  detailVal: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#e8f4ff",
  },
  detailLbl: {
    fontSize: "11px",
    color: "#6b90b0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginTop: "4px",
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "#6b90b0",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  forecastRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    marginBottom: "32px",
  },
  forecastDay: {
    background: "#0c1e35",
    border: "1px solid #1a3050",
    borderRadius: "12px",
    padding: "12px 8px",
    textAlign: "center",
  },
  forecastDayName: {
    fontSize: "12px",
    color: "#6b90b0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
  },
  forecastHi: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#e8f4ff",
  },
  forecastLo: {
    fontSize: "12px",
    color: "#6b90b0",
  },
  hourlyScroll: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "8px",
    marginBottom: "32px",
    scrollbarWidth: "thin",
    scrollbarColor: "#1a3050 transparent",
  },
  hourlyItem: {
    background: "#0c1e35",
    border: "1px solid #1a3050",
    borderRadius: "12px",
    padding: "12px 14px",
    textAlign: "center",
    flexShrink: 0,
    minWidth: "70px",
  },
  hourlyTime: {
    fontSize: "11px",
    color: "#6b90b0",
    marginBottom: "6px",
  },
  hourlyTemp: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#e8f4ff",
    marginTop: "4px",
  },
};

const DETAIL_STATS = (w, unit) => [
  { icon: "💧", val: `${w.main.humidity}%`, lbl: "Humidity" },
  { icon: "🌬️", val: `${msToKmh(w.wind.speed)} km/h`, lbl: "Wind" },
  { icon: "🔵", val: `${w.main.pressure} hPa`, lbl: "Pressure" },
  { icon: "👁️", val: `${(w.visibility / 1000).toFixed(1)} km`, lbl: "Visibility" },
  { icon: "☁️", val: `${w.clouds?.all}%`, lbl: "Cloud Cover" },
  { icon: "🌡️", val: fmt(w.main.temp_min, unit), lbl: "Min Temp" },
  { icon: "🌡️", val: fmt(w.main.temp_max, unit), lbl: "Max Temp" },
  { icon: "💨", val: w.wind.deg != null ? `${w.wind.deg}°` : "—", lbl: "Wind Dir" },
];

export default function DetailModal({ city, onClose }) {
  const dispatch = useDispatch();
  const unit = useSelector((s) => s.settings.unit);
  const key = `${city.lat},${city.lon}`;
  const currentEntry = useSelector((s) => s.weather.current[key]);
  const forecastEntry = useSelector((s) => s.weather.forecasts[key]);

 
  useEffect(() => {
    dispatch(loadForecast({ lat: city.lat, lon: city.lon }));
  }, [dispatch, city.lat, city.lon]);

 
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const w = currentEntry?.data;
  const forecastList = forecastEntry?.data?.list;
  const dailyData = forecastList ? buildDailyData(forecastList, unit) : [];
  const hourlyChartData = forecastList ? buildHourlyChartData(forecastList, unit) : [];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        
        {w ? (
          <div style={styles.hero}>
            <img style={styles.heroIcon} src={wIcon(w.weather[0].icon)} alt="" />
            <div>
              <div style={styles.heroCity}>{city.name}</div>
              <div style={styles.heroTemp}>{fmt(w.main.temp, unit)}</div>
              <div style={styles.heroDesc}>{w.weather[0].description}</div>
            </div>
            <div style={styles.heroRight}>
              <div style={styles.heroFeelsLabel}>Feels like</div>
              <div style={styles.heroFeels}>{fmt(w.main.feels_like, unit)}</div>
              <div style={styles.heroHiLo}>
                H: {fmt(w.main.temp_max, unit)} · L: {fmt(w.main.temp_min, unit)}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.loadingRow}>
            <span style={styles.pulse}>Loading weather…</span>
          </div>
        )}

        
        {w && (
          <div style={styles.detailGrid}>
            {DETAIL_STATS(w, unit).map((d, i) => (
              <div key={i} style={styles.detailCard}>
                <div style={styles.detailIcon}>{d.icon}</div>
                <div style={styles.detailVal}>{d.val}</div>
                <div style={styles.detailLbl}>{d.lbl}</div>
              </div>
            ))}
          </div>
        )}

        
        {forecastEntry?.loading && (
          <div style={styles.loadingRow}>
            <span style={styles.pulse}>Loading forecast…</span>
          </div>
        )}

        {dailyData.length > 0 && (
          <>
            <div style={styles.sectionTitle}>7-Day Forecast</div>
            <div style={styles.forecastRow}>
              {dailyData.map((d, i) => (
                <div key={i} style={styles.forecastDay}>
                  <div style={styles.forecastDayName}>{d.day.split(",")[0]}</div>
                  <img src={wIcon(d.icon)} alt="" style={{ width: "36px", height: "36px" }} />
                  <div style={styles.forecastHi}>{d.hi}°</div>
                  <div style={styles.forecastLo}>{d.lo}°</div>
                </div>
              ))}
            </div>
          </>
        )}

        
        {forecastList && (
          <>
            <div style={styles.sectionTitle}>Hourly Forecast</div>
            <div style={styles.hourlyScroll}>
              {forecastList.slice(0, 16).map((item, i) => (
                <div key={i} style={styles.hourlyItem}>
                  <div style={styles.hourlyTime}>{hourFmt(item.dt)}</div>
                  <img src={wIcon(item.weather[0].icon)} alt="" style={{ width: "28px", height: "28px" }} />
                  <div style={styles.hourlyTemp}>{fmt(item.main.temp, unit)}</div>
                </div>
              ))}
            </div>
          </>
        )}

        
        {hourlyChartData.length > 0 && (
          <WeatherCharts data={hourlyChartData} unit={unit} />
        )}
      </div>
    </div>
  );
}