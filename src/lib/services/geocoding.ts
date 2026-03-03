import type { GeocodingResult } from "$lib/types/geocoding";

export const getGeo = async (
  city: string,
): Promise<GeocodingResult[] | undefined> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: { results: GeocodingResult[] } = await response.json();
    return data.results.map((result) => ({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      country_code: result.country_code,
      admin1: result.admin1,
      admin3: result.admin3,
    }));
  } catch (err) {
    console.error(err);
  }
};
