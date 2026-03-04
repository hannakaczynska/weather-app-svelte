import type { GeocodingResult, GeocodingApiResult } from "$lib/types/geocoding";

export const getGeo = async (
  city: string,
): Promise<GeocodingResult[] | string> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: { results: GeocodingApiResult[] } = await response.json();
    return data.results.map((result) => ({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      countryCode: result.country_code,
      region: result.admin1,
      closerRegion: result.admin3,
    }));
  } catch (err) {
    return "error";
  }
};
