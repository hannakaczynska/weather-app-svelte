import type { GeocodingResult } from "$lib/types/geocoding";
import type { WeatherResult } from "$lib/types/weather";
import { getWeather } from "$lib/services/weather";

const stored =
  typeof window !== "undefined" ? localStorage.getItem("currentCity") : null;

export const store = $state({
  currentCity: stored ? (JSON.parse(stored) as GeocodingResult) : null,
  weather: null as WeatherResult | null,
  loading: false,
   error: null as string | null,
});

if (stored && typeof window !== "undefined") {
  store.loading = true;
  const city = JSON.parse(stored) as GeocodingResult;
  getWeather(city.latitude, city.longitude)
    .then((weather) => {
      store.weather = weather;
    })
    .catch(() => (store.error = "Failed to load weather data"))
    .finally(() => {
      store.loading = false;
    });
}

export const setCurrentCity = async (city: GeocodingResult): Promise<void> => {
  store.loading = true;
  store.currentCity = city;
  localStorage.setItem("currentCity", JSON.stringify(city));
  store.weather = await getWeather(city.latitude, city.longitude);
  store.loading = false;
};
