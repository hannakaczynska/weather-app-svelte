import type { CurrentWeatherResult } from "$lib/types/weather";

export const getCurrentWeather = async (
  latitude: number,
  longitude: number,
): Promise<CurrentWeatherResult | undefined> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=auto`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return {
      temperature: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      code: data.current.weather_code,
    };
  } catch (err) {
    console.error(err);
  }
};
