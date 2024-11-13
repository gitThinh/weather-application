export const useUnitsTemp = () => {
  const weatherStore = useWeatherStore();

  const getIconUnit = () => {
    return weatherStore.unit === "metric" ? "/icons/doC.png" : "/icons/doF.png";
  };

  const handleChangeUnits = () => {
    weatherStore.setUnit(weatherStore.unit === "metric" ? "imperial" : "metric");
  };

  return {
    handleChangeUnits,
    getIconUnit,
  };
};
