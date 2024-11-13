import _ from "lodash";
import { APP_CONFIGS } from "~/config-global";
import { ref } from "vue";
import { suggestLocation } from "~/services/api";
import type { SuggestionResult } from "~/types/weatherLocationResponse";

export const useSuggestLocation = () => {
  const weatherStore = useWeatherStore();
  const suggestions = ref<SuggestionResult[]>([]);
  const recentSelected = useState<SuggestionResult[]>(
    "recentSelected",
    () => []
  );
  const pending = ref<boolean>(false);
  const error = ref<boolean>(false);

  if (import.meta.client) {
    const storedRecent = localStorage.getItem(APP_CONFIGS.recentSuggestionKey);
    if (storedRecent?.length) {
      recentSelected.value = JSON.parse(storedRecent);
      // set selected location from recentSelected
      if (recentSelected.value[0].name !== weatherStore.selectedLocation.name || recentSelected.value[0].name === "Da Nang") {
        weatherStore.setSelectedLocation(recentSelected.value[0]);
      }
    }
  }

  // call API suggestions
  const fetchSuggestions = async (query: string) => {
    pending.value = true;
    error.value = false;

    try {
      // call api suggest location
      const response = await suggestLocation(query)

      suggestions.value = response || [];
    } catch (err) {
      console.error("Something wrong with location suggest api", err);
      error.value = true;
    } finally {
      pending.value = false;
    }
  };

  //
  const saveRecentSuggestion = (suggestion: SuggestionResult) => {
    // check duplicate
    if (
      recentSelected.value.some(
        (item) => item.lat === suggestion.lat && item.lon === suggestion.lon
      )
    ) {
      recentSelected.value = recentSelected.value.filter(
        (item) => item.lat !== suggestion.lat && item.lon !== suggestion.lon
      )
      recentSelected.value.unshift(suggestion);
    } else {
      recentSelected.value.unshift(suggestion);
    }

    // Lưu lại recent selected vào localStorage
    if (import.meta.client) {
      localStorage.setItem(
        APP_CONFIGS.recentSuggestionKey,
        JSON.stringify(recentSelected.value)
      );
    }
  };

  const deleteRecentSuggestion = (index: number) => {
    recentSelected.value = recentSelected.value.filter((_, i) => i !== index);
    localStorage.setItem(
      APP_CONFIGS.recentSuggestionKey,
      JSON.stringify(recentSelected.value)
    );
  };

  return {
    suggestions,
    recentSelected,
    pending,
    error,
    fetchSuggestions,
    saveRecentSuggestion,
    deleteRecentSuggestion,
  };
};
