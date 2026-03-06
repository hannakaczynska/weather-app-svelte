export const getWeatherCondition = (code: number | undefined): string => {
  if (code === 0) return "sunny";
  if (code === 1) return "mainly-clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3 || code === 45 || code === 48) return "overcast";
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57)
    return "drizzle";
  if (code === 61) return "rainy-slight";
  if (code === 63) return "rainy-moderate";
  if (code === 65) return "rainy-heavy";
  if (code === 66 || code === 80) return "rainy-showers-slight";
  if (code === 81) return "rainy-showers-moderate";
  if (code === 67 || code === 82) return "rainy-showers-heavy";
  if (code === 71) return "snowy-slight";
  if (code === 73) return "snowy-moderate";
  if (code === 75) return "snowy-heavy";
  if (code === 85) return "snowy-showers-slight";
  if (code === 86 || code === 77) return "snowy-showers-heavy";
  if (code === 95 || code === 96 || code === 99) return "thunderstorm";
  return "cloudy";
};
