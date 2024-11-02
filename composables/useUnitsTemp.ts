import { APP_CONFIGS } from "~/config-global";

export const useUnitsTemp = () => {
  const weatherStore = useWeatherStore();

  if (import.meta.client) {
    const storedUnits = localStorage.getItem(APP_CONFIGS.unitTempKey);
    if (storedUnits) {
      weatherStore.setUnit(JSON.parse(storedUnits) === "metric" ? "metric" : "imperial");
    }
  }

  const getIconUnit = () => {
    return weatherStore.unit === "metric" ? "/icons/doC.png" : "/icons/doF.png";
  };

  const handleChangeUnits = () => {
    weatherStore.setUnit(weatherStore.unit === "metric" ? "imperial" : "metric");

    // storage unit
    if (import.meta.client) {
      localStorage.setItem(APP_CONFIGS.unitTempKey, JSON.stringify(weatherStore.unit));
    }
  };

  return {
    handleChangeUnits,
    getIconUnit,
  };
};
