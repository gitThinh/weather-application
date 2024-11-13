import { dailyWeather } from "~/services/api";
import type { WeatherDailyResponse } from "~/types/weatherLocationResponse";

export const useDailyWeather = () => {
  const weatherStore = useWeatherStore();

  const dailyWeatherInfo = useState<WeatherDailyResponse | null>(
    "dailyWeather",
    () => null
  );

  const getdailyWeather = async () => {
    if (
      dailyWeatherInfo.value &&
      weatherStore.selectedLocation.name === dailyWeatherInfo.value.city.name
    ) {
      return;
    }

    const lat = weatherStore.selectedLocation?.lat || 16.068;
    const lon = weatherStore.selectedLocation?.lon || 108.212;
    const units = weatherStore.unit;
    try {
      const data = await dailyWeather(lat, lon, units);
      dailyWeatherInfo.value = data;
    } catch (error) {
      dailyWeatherInfo.value = null;
      console.error(error);
    }
  };

  watch(
    [
      () => weatherStore.selectedLocation.lat,
      () => weatherStore.selectedLocation.lon,
      () => weatherStore.unit,
    ],
    getdailyWeather,
    { immediate: true }
  );

  return {
    dailyWeatherInfo,
  };
};
