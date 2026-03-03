import type { WeatherResult} from "$lib/types/weather";

export const getWeather = async (
  latitude: number,
  longitude: number,
): Promise<WeatherResult | undefined> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const currentWeather = {
      temperature: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      code: data.current.weather_code,
    };

    const forcast = {
      maxTemperatures: data.daily.temperature_2m_max,
      minTemperatures: data.daily.temperature_2m_min,
      dates: data.daily.time,
      codes: data.daily.weather_code,
    };

    return {currentWeather, forcast};
  } catch (err) {
    console.error(err);
  }
};
