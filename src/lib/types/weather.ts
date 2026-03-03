export interface CurrentWeatherResult {
temperature: number,
wind: number,
humidity: number,
code: number
}

export interface ForcastResult {
    maxTemperatures: number[],
    minTemperatures: number[],
    dates: string[],
    codes: number[]
}

export interface WeatherResult {
    currentWeather: CurrentWeatherResult,
    forcast: ForcastResult,
}
