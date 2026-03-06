export interface CurrentWeatherResult {
temperature: number,
wind: number,
humidity: number,
code: number
}

export interface ForecastResult {
    maxTemperatures: number[],
    minTemperatures: number[],
    dates: string[],
    codes: number[]
}

export interface WeatherResult {
    currentWeather: CurrentWeatherResult,
    forecast: ForecastResult,
}
