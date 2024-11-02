import { defineStore } from 'pinia';
import type { SuggestionResult } from '~/composables/useSuggestLocation';
import type { weatherLocationResponse } from '~/types/weatherLocationResponse';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    unit: 'metric' as 'metric' | 'imperial',
    selectedLocation: {
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
      } as SuggestionResult,
    currentWeatherInfo: null as weatherLocationResponse | null,
  }),
  actions: {
    setUnit(newUnit: 'metric' | 'imperial') {
      this.unit = newUnit;
    },
    setSelectedLocation(location: SuggestionResult) {
      this.selectedLocation = location;
    },
    setCurrentWeatherInfo(weather: weatherLocationResponse | null) {
      this.currentWeatherInfo = weather;
    },
  },
});

