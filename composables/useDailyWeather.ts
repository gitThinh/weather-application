import { dailyWeather } from "~/services/api";
import type { WeatherDailyResponse } from "~/types/weatherLocationResponse";

export const useDailyWeather = () => {
  const { selectedLocation } = useSuggestLocation();
  const { unit } = useUnitsTemp();

  const dailyWeatherInfo = useState<WeatherDailyResponse | null>("dailyWeather", () => (null))

  const getdailyWeather = async () => {
    const lat = selectedLocation.value?.lat || 16.068;
    const lon = selectedLocation.value?.lon || 108.212;
    const units = unit.value;
    try {
      const data = await dailyWeather(lat, lon, units)
      dailyWeatherInfo.value = data;
    } catch (error) {
      dailyWeatherInfo.value = null
      console.error(error);
    }
  }

  watchEffect(() => {
    getdailyWeather();
  });

  return {
    dailyWeatherInfo,
  };
};
