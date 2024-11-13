export interface weatherState {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface weatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface weatherWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface weatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface weatherLocationResponse {
  dt?: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: weatherState[];
  base: string;
  main: weatherMain;
  visibility: number;
  wind: weatherWind;
  clouds: {
    all: number;
  };
  rain?: {
    [key: string]: number;
  };
  snow?: {
    [key: string]: number;
  };
  sys: weatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDailyResponse {
  city: {
    coord: {
      lon: number;
      lat: number;
    };
    id: number;
    name: string;
    cod: number;
  };
  cod: string;
  message: any;
  cnt: number;
  list: weatherLocationResponse[];
}

export interface SuggestionResult {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  state?: string;
  local_names: {
    [key: string]: string;
  };
}