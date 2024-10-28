import _ from "lodash";
import { APP_CONFIGS } from "~/config-global";
import { ref } from "vue";
import { suggestLocation } from "~/services/api";

export interface SuggestionResulf {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  state?: string;
  local_names: {
    [key: string]: string;
  };
}

export const useSuggestLocation = () => {
  const suggestions = ref<SuggestionResulf[]>([]);
  const selectedLocation = useState<SuggestionResulf | null>(
    "selectedLocation",
    () => ({
      lat: 16.068,
      lon: 108.212,
      name: "Da Nang",
      country: "VN",
      local_names: {
        eo: "Danango",
        ko: "다낭",
        vi: "Thành phố Đà Nẵng",
        ja: "ダナン",
        zh: "峴港",
        pt: "Da Nang",
        ru: "Дананг",
        en: "Da Nang",
        km: "ដាណាំង",
      },
    })
  );
  const recentSelected = useState<SuggestionResulf[]>(
    "recentSelected",
    () => []
  );
  const pending = ref<boolean>(false);
  const error = ref<boolean>(false);

  if (import.meta.client) {
    const storedRecent = localStorage.getItem(APP_CONFIGS.recentSuggestionKey);
    if (storedRecent) {
      recentSelected.value = JSON.parse(storedRecent);
      
      // check recent search
      if (recentSelected.value.length) {
        selectedLocation.value = recentSelected.value[0];
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
  const saveRecentSuggestion = (suggestion: SuggestionResulf) => {
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
    selectedLocation,
    suggestions,
    recentSelected,
    pending,
    error,
    fetchSuggestions,
    saveRecentSuggestion,
    deleteRecentSuggestion,
  };
};
