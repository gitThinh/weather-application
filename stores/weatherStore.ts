import { defineStore } from 'pinia';
import type { WeatherDailyResponse, weatherLocationResponse } from '~/types/weatherLocationResponse';

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
      } as SuggestionResulf,
    currentWeather: null as weatherLocationResponse | null,
    dailyWeather: null as WeatherDailyResponse | null,
  }),
  actions: {
    setUnit(newUnit: 'metric' | 'imperial') {
      this.unit = newUnit;
    },
    setSelectedLocation(location: SuggestionResulf) {
      this.selectedLocation = location;
    },
    setCurrentWeather(weather: weatherLocationResponse) {
      this.currentWeather = weather;
    },
    setDailyWeather(weather: WeatherDailyResponse) {
      this.dailyWeather = weather;
    },
  },
});
