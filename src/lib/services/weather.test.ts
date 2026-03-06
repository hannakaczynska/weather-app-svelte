import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getWeather } from './weather';
import type { WeatherResult } from '$lib/types/weather';

// Mock fetch globally
global.fetch = vi.fn();

describe('weather', () => {
  describe('getWeather', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return weather data for successful API call', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 20.5,
          wind_speed_10m: 5.2,
          relative_humidity_2m: 65,
          weather_code: 1
        },
        daily: {
          temperature_2m_max: [22.0, 24.5, 19.8, 21.3, 25.1, 20.7, 23.2],
          temperature_2m_min: [15.2, 18.1, 12.4, 16.8, 19.3, 14.6, 17.5],
          time: [
            '2024-01-15',
            '2024-01-16',
            '2024-01-17',
            '2024-01-18',
            '2024-01-19',
            '2024-01-20',
            '2024-01-21'
          ],
          weather_code: [1, 2, 3, 61, 71, 95, 0]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(51.5074, -0.1278);

      const expectedResult: WeatherResult = {
        currentWeather: {
          temperature: 20.5,
          wind: 5.2,
          humidity: 65,
          code: 1
        },
        forecast: {
          maxTemperatures: [22.0, 24.5, 19.8, 21.3, 25.1, 20.7, 23.2],
          minTemperatures: [15.2, 18.1, 12.4, 16.8, 19.3, 14.6, 17.5],
          dates: [
            '2024-01-15',
            '2024-01-16',
            '2024-01-17',
            '2024-01-18',
            '2024-01-19',
            '2024-01-20',
            '2024-01-21'
          ],
          codes: [1, 2, 3, 61, 71, 95, 0]
        }
      };

      expect(fetch).toHaveBeenCalledWith(
        'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto'
      );
      expect(result).toEqual(expectedResult);
    });

    it('should handle negative coordinates', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: -5.0,
          wind_speed_10m: 12.8,
          relative_humidity_2m: 85,
          weather_code: 71
        },
        daily: {
          temperature_2m_max: [-2.0, -1.5, -3.8],
          temperature_2m_min: [-8.2, -7.1, -9.4],
          time: ['2024-01-15', '2024-01-16', '2024-01-17'],
          weather_code: [71, 73, 75]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(-34.6037, -58.3816); // Buenos Aires

      expect(fetch).toHaveBeenCalledWith(
        'https://api.open-meteo.com/v1/forecast?latitude=-34.6037&longitude=-58.3816&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto'
      );
      expect(result?.currentWeather.temperature).toBe(-5.0);
      expect(result?.forecast.maxTemperatures).toEqual([-2.0, -1.5, -3.8]);
    });

    it('should handle zero values correctly', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 0,
          wind_speed_10m: 0,
          relative_humidity_2m: 0,
          weather_code: 0
        },
        daily: {
          temperature_2m_max: [0, 0, 0],
          temperature_2m_min: [0, 0, 0],
          time: ['2024-01-15', '2024-01-16', '2024-01-17'],
          weather_code: [0, 0, 0]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(0, 0);

      expect(result?.currentWeather.temperature).toBe(0);
      expect(result?.currentWeather.wind).toBe(0);
      expect(result?.currentWeather.humidity).toBe(0);
      expect(result?.currentWeather.code).toBe(0);
    });

    it('should return null when API returns non-ok response', async () => {
      const mockResponse = {
        ok: false,
        status: 404
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(51.5074, -0.1278);

      expect(result).toBeNull();
    });

    it('should return null when fetch throws an error', async () => {
      (fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await getWeather(51.5074, -0.1278);

      expect(result).toBeNull();
    });

    it('should return null when JSON parsing fails', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(51.5074, -0.1278);

      expect(result).toBeNull();
    });

    it('should handle API response with missing current data', async () => {
      const mockWeatherData = {
        daily: {
          temperature_2m_max: [20.0],
          temperature_2m_min: [10.0],
          time: ['2024-01-15'],
          weather_code: [1]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(51.5074, -0.1278);

      expect(result).toBeNull();
    });

    it('should handle API response with missing daily data', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 20.5,
          wind_speed_10m: 5.2,
          relative_humidity_2m: 65,
          weather_code: 1
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(51.5074, -0.1278);

      expect(result).toBeNull();
    });

    it('should handle extreme coordinate values', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: -40.0,
          wind_speed_10m: 50.0,
          relative_humidity_2m: 100,
          weather_code: 95
        },
        daily: {
          temperature_2m_max: [-35.0],
          temperature_2m_min: [-45.0],
          time: ['2024-01-15'],
          weather_code: [95]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(90, 180); // Extreme coordinates

      expect(fetch).toHaveBeenCalledWith(
        'https://api.open-meteo.com/v1/forecast?latitude=90&longitude=180&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto'
      );
      expect(result?.currentWeather.wind).toBe(50.0);
      expect(result?.currentWeather.humidity).toBe(100);
    });

    it('should handle various HTTP error status codes', async () => {
      const statusCodes = [400, 401, 403, 404, 500, 502, 503];

      for (const statusCode of statusCodes) {
        const mockResponse = {
          ok: false,
          status: statusCode
        };

        (fetch as any).mockResolvedValue(mockResponse);

        const result = await getWeather(51.5074, -0.1278);

        expect(result).toBeNull();
      }
    });

    it('should handle decimal coordinates with high precision', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 18.7,
          wind_speed_10m: 3.4,
          relative_humidity_2m: 72,
          weather_code: 2
        },
        daily: {
          temperature_2m_max: [20.1, 19.8],
          temperature_2m_min: [16.3, 15.9],
          time: ['2024-01-15', '2024-01-16'],
          weather_code: [2, 3]
        }
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockWeatherData)
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getWeather(40.712776, -74.005974); // High precision NYC coordinates

      expect(fetch).toHaveBeenCalledWith(
        'https://api.open-meteo.com/v1/forecast?latitude=40.712776&longitude=-74.005974&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto'
      );
      expect(result).toBeDefined();
    });
  });
});