import { useState } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { CHART_TABS } from "../utils/constants";

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#0f1c2e",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #1a3050",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: "12px", marginBottom: "5px", color: "#aaa" }}>
        {label}
      </div>

      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: "13px" }}>
          {p.name}: {p.value}
          {unit}
        </div>
      ))}
    </div>
  );
}

function TempChart({ data, unit }) {
  return (
    <AreaChart data={data}>
      <defs>
        <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" />
      <XAxis dataKey="time" tick={{ fill: "#6b90b0", fontSize: 11 }} interval={3} />
      <YAxis tick={{ fill: "#6b90b0", fontSize: 11 }} />

      <Tooltip content={<ChartTooltip unit={`°${unit}`} />} />
      <Legend />

      <Area
        type="monotone"
        dataKey="temp"
        name="Temp"
        stroke="#00d4ff"
        fill="url(#tempGrad)"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="feels"
        name="Feels like"
        stroke="#ff6b35"
        strokeWidth={2}
        dot={false}
      />
    </AreaChart>
  );
}

function RainChart({ data }) {
  return (
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" />
      <XAxis dataKey="time" tick={{ fill: "#6b90b0", fontSize: 11 }} interval={3} />
      <YAxis tick={{ fill: "#6b90b0", fontSize: 11 }} />
      <Tooltip content={<ChartTooltip unit=" mm" />} />

      <Bar dataKey="rain" name="Rain (mm)" fill="#4a9eff" radius={[4, 4, 0, 0]} />
    </BarChart>
  );
}

function WindChart({ data }) {
  return (
    <AreaChart data={data}>
      <defs>
        <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00e5a0" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#00e5a0" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" />
      <XAxis dataKey="time" tick={{ fill: "#6b90b0", fontSize: 11 }} interval={3} />
      <YAxis tick={{ fill: "#6b90b0", fontSize: 11 }} />
      <Tooltip content={<ChartTooltip unit=" km/h" />} />

      <Area
        type="monotone"
        dataKey="wind"
        name="Wind"
        stroke="#00e5a0"
        fill="url(#windGrad)"
        strokeWidth={2}
      />
    </AreaChart>
  );
}

function HumidityChart({ data }) {
  return (
    <AreaChart data={data}>
      <defs>
        <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffba08" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#ffba08" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" />
      <XAxis dataKey="time" tick={{ fill: "#6b90b0", fontSize: 11 }} interval={3} />
      <YAxis tick={{ fill: "#6b90b0", fontSize: 11 }} domain={[0, 100]} />
      <Tooltip content={<ChartTooltip unit="%" />} />

      <Area
        type="monotone"
        dataKey="humidity"
        name="Humidity"
        stroke="#ffba08"
        fill="url(#humidGrad)"
        strokeWidth={2}
      />
    </AreaChart>
  );
}

export default function WeatherCharts({ data, unit }) {
  const [activeTab, setActiveTab] = useState("temp");

  const renderChart = () => {
    switch (activeTab) {
      case "temp": return <TempChart data={data} unit={unit} />;
      case "rain": return <RainChart data={data} />;
      case "wind": return <WindChart data={data} />;
      case "humidity": return <HumidityChart data={data} />;
      default: return null;
    }
  };

  return (
    <>
     
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        {CHART_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: activeTab === t.id ? "#00d4ff" : "#eee",
              color: activeTab === t.id ? "#000" : "#333",
              fontWeight: "bold",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      
      <div
        style={{
          width: "100%",
          height: "220px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </>
  );
}