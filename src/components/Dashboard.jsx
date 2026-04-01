import { useState } from "react";
import { useSelector } from "react-redux";
import { useWeatherPolling } from "../hooks/useWeatherPolling";
import { useToast } from "../hooks/useToast";
import CityCard from "./CityCard";
import SearchBar from "./SearchBar";
import UnitToggle from "./UnitToggle";
import DetailModal from "./DetailModal";
import Toast from "./Toast";

const styles = {
  app: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px 20px",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    background: "linear-gradient(135deg, #00d4ff, #0080ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  logoAccent: {
    color: "#ff6b35",
    WebkitTextFillColor: "#ff6b35",
  },
  tagline: {
    fontSize: "12px",
    color: "#6b90b0",
    marginTop: "4px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: "500px",
  },
  searchWrap: {
    flex: "1",
    minWidth: "220px",
  },
  cityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  footer: {
    textAlign: "center",
    color: "#6b90b0",
    fontSize: "12px",
    padding: "20px 0",
    borderTop: "1px solid #1a3050",
    marginTop: "16px",
  },
};

export default function Dashboard() {
  const cities = useSelector((state) => state.cities);
  const favorites = useSelector((state) => state.favorites);
  const [selectedCity, setSelectedCity] = useState(null);
  const { toast, showToast } = useToast();

  useWeatherPolling();

  const sortedCities = [...cities].sort((a, b) => {
    const ka = `${a.lat},${a.lon}`;
    const kb = `${b.lat},${b.lon}`;
    return (favorites.includes(kb) ? 1 : 0) - (favorites.includes(ka) ? 1 : 0);
  });

  return (
    <div style={styles.app}>
      
      
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>
            ⛅ Sky<span style={styles.logoAccent}>Lens</span>
          </div>
          <div style={styles.tagline}>
            Real-time weather analytics
          </div>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.searchWrap}>
            <SearchBar
              onCityAdded={(name) => showToast(`✅ Added ${name}`)}
            />
          </div>

          <UnitToggle />
        </div>
      </header>

      
      <div style={styles.cityGrid}>
        {sortedCities.map((city) => (
          <CityCard
            key={`${city.lat},${city.lon}`}
            city={city}
            onClick={() => setSelectedCity(city)}
          />
        ))}
      </div>

      
      {selectedCity && (
        <DetailModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}

     
      {toast && <Toast message={toast} />}

      
      <footer style={styles.footer}>
        SkyLens Weather Dashboard · Data refreshes every 60s · Powered by OpenWeatherMap
      </footer>
    </div>
  );
}