
export const toC = (k) => (k - 273.15).toFixed(1);


export const toF = (k) => ((k - 273.15) * 9 / 5 + 32).toFixed(1);


export const fmt = (k, unit) => `${unit === "C" ? toC(k) : toF(k)}°${unit}`;

export const wIcon = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;


export const dayName = (dt) =>
  new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "short" });


export const hourFmt = (dt) =>
  new Date(dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });


export const msToKmh = (ms) => (ms * 3.6).toFixed(1);


export function buildDailyData(list, unit) {
  const days = {};
  list.forEach((item) => {
    const d = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    if (!days[d]) days[d] = { day: d, hi: -Infinity, lo: Infinity, icons: [], rain: 0 };
    days[d].hi = Math.max(days[d].hi, item.main.temp_max);
    days[d].lo = Math.min(days[d].lo, item.main.temp_min);
    days[d].icons.push(item.weather[0].icon);
    days[d].rain += item.rain?.["3h"] || 0;
  });
  return Object.values(days)
    .slice(0, 7)
    .map((d) => ({
      ...d,
      hi: parseFloat(unit === "C" ? toC(d.hi) : toF(d.hi)),
      lo: parseFloat(unit === "C" ? toC(d.lo) : toF(d.lo)),
      icon: d.icons[Math.floor(d.icons.length / 2)],
    }));
}


 
export function buildHourlyChartData(list, unit) {
  return list.slice(0, 24).map((item) => ({
    time: hourFmt(item.dt),
    temp: parseFloat(unit === "C" ? toC(item.main.temp) : toF(item.main.temp)),
    feels: parseFloat(unit === "C" ? toC(item.main.feels_like) : toF(item.main.feels_like)),
    rain: item.rain?.["3h"] || 0,
    wind: parseFloat(msToKmh(item.wind.speed)),
    humidity: item.main.humidity,
  }));
}