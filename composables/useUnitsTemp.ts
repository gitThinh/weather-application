import { APP_CONFIGS } from "~/config-global";

export const useUnitsTemp = () => {
  const unit = useState<"metric" | "imperial">("unitTemp", () => "metric") // metric is C, imperial is F

  if (import.meta.client) {
    const storedRecent = localStorage.getItem(APP_CONFIGS.unitTempKey);
    if (storedRecent) {
      unit.value = JSON.parse(storedRecent) === "metric" ? "metric" : "imperial";
    }
  }

  const getIconUnit = () => {
    return unit.value === "metric" ? "/icons/doC.png" : "/icons/doF.png";
  };

  const handleChangeUnits = () => {
    unit.value = unit.value === "metric" ? "imperial" : "metric";

    // storage unit
    if (import.meta.client) {
      localStorage.setItem(APP_CONFIGS.unitTempKey, JSON.stringify(unit.value));
    }
  };

  return {
    unit,
    handleChangeUnits,
    getIconUnit,
  };
};
