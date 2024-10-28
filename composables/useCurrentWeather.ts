import { currentWeather } from "~/services/api";
import type { weatherLocationResponse } from "~/types/weatherLocationResponse";

export const useCurrentWeather = () => {
  const { selectedLocation } = useSuggestLocation();
  const { unit } = useUnitsTemp();

  const currentWeatherInfo = useState<weatherLocationResponse | null>("currentWeather", () => (null))

  const getCurrentWeather = async () => {
    const lat = selectedLocation.value?.lat || 16.068;
    const lon = selectedLocation.value?.lon || 108.212;
    const units = unit.value;
    try {
      const data = await currentWeather(lat, lon, units)
      currentWeatherInfo.value = data;
    } catch (error) {
      currentWeatherInfo.value = null
      console.error(error);
    }
  }

  watchEffect(() => {
    getCurrentWeather();
  });

  return {
    currentWeatherInfo,
  };
};
