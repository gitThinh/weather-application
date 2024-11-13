import { defineStore } from "pinia";
import { currentWeather } from "~/services/api";
import type { SuggestionResult, weatherLocationResponse } from "~/types/weatherLocationResponse";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    unit: "metric" as "metric" | "imperial",
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
    async initStore() {
      if (!this.currentWeatherInfo) {
        await this.getCurrentWeather();
      }
    },
    setUnit(newUnit: "metric" | "imperial") {
      this.unit = newUnit;
      this.getCurrentWeather(
        this.selectedLocation.lat,
        this.selectedLocation.lon
      );
    },
    setSelectedLocation(location: SuggestionResult) {
      if (
        this.selectedLocation.name === location.name &&
        location?.name !== "Da Nang"
      )
        return;
      this.selectedLocation = location;
      this.getCurrentWeather(location.lat, location.lon);
    },
    setCurrentWeatherInfo(weather: weatherLocationResponse | null) {
      this.currentWeatherInfo = weather;
    },
    async getCurrentWeather(locationLat?: number, locationLon?: number) {
      const lat = locationLat ?? this.selectedLocation.lat;
      const lon = locationLon ?? this.selectedLocation.lon;
      const units = this.unit;

      if (
        this.currentWeatherInfo &&
        // check location with currentWeather location
        lat === this.currentWeatherInfo?.coord.lat &&
        lon === this.currentWeatherInfo?.coord.lon
      )
        return;
      
      try {
        const data = await currentWeather(lat, lon, units);
        data && this.setCurrentWeatherInfo(data);
      } catch (error) {
        this.setCurrentWeatherInfo(null);
        console.error(error);
      }
    },
  },
});
