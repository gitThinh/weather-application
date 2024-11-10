import { currentWeather } from "~/services/api";

export const useCurrentWeather = () => {
  const weatherStore = useWeatherStore();

  const getCurrentWeather = async () => {
    const lat = weatherStore.selectedLocation?.lat || 16.068;
    const lon = weatherStore.selectedLocation?.lon || 108.212;
    const units = weatherStore.unit;
    try {
      const data = await currentWeather(lat, lon, units);
      weatherStore.setCurrentWeatherInfo(data);
    } catch (error) {
      weatherStore.setCurrentWeatherInfo(null);
      console.error(error);
    }
  };

  return {
    getCurrentWeather,
  };
};
