import type { GeocodingResult } from '$lib/types/geocoding';

const stored = typeof window !== 'undefined' 
  ? localStorage.getItem('currentCity') 
  : null;

export const store = $state({
currentCity: stored ? JSON.parse(stored) as GeocodingResult : null,
  loading: false,
  error: null as string | null,
});

export const setCurrentCity = (city: GeocodingResult) => {
  store.currentCity = city;
  localStorage.setItem('currentCity', JSON.stringify(city));
}