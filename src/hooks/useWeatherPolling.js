import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentWeather } from "../store/weatherSlice";
import { CACHE_TTL } from "../utils/constants";


export function useWeatherPolling() {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    const fetchAll = () => {
      cities.forEach(({ lat, lon }) => dispatch(loadCurrentWeather({ lat, lon })));
    };

    fetchAll();
    const interval = setInterval(fetchAll, CACHE_TTL);
    return () => clearInterval(interval);
  }, [dispatch, cities]);
}