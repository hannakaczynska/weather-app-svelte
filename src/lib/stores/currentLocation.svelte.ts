import type { GeocodingResult } from '$lib/types/geocoding';

export const store = $state({
  currentCity: null as GeocodingResult | null,
  loading: false,
  error: null as string | null,
});

