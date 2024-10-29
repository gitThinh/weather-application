import type { WeatherDailyResponse, weatherLocationResponse } from "~/types/weatherLocationResponse";

export const currentWeather = (lat: number, lon: number, units: string) => {
  return $fetch<weatherLocationResponse>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        units,
        appid: useRuntimeConfig().public.api_key_weather,
        // lang: "vi"
      },
    }
  );
};

export const suggestLocation = (query: string) => {
  return $fetch<SuggestionResulf[]>(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: query,
        limit: 5,
        appid: useRuntimeConfig().public.api_key_weather,
        lang: "vi"
      },
    }
  );
};

export const dailyWeather = (lat: number, lon: number, units: string) => {
    return $fetch<WeatherDailyResponse>(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          units,
          cnt: 20,
          appid: useRuntimeConfig().public.api_key_weather,
        },
      }
    );
  };
