import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGeo } from './geocoding';
import type { GeocodingApiResult } from '$lib/types/geocoding';

global.fetch = vi.fn();

describe('geocoding', () => {
  describe('getGeo', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return mapped geocoding results for successful API call', async () => {
      const mockApiResults: GeocodingApiResult[] = [
        {
          id: 1,
          name: 'London',
          latitude: 51.5074,
          longitude: -0.1278,
          country: 'United Kingdom',
          country_code: 'GB',
          admin1: 'England',
          admin3: 'Greater London'
        },
        {
          id: 2,
          name: 'London',
          latitude: 42.9834,
          longitude: -81.2497,
          country: 'Canada',
          country_code: 'CA',
          admin1: 'Ontario',
          admin3: 'Middlesex County'
        }
      ];

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ results: mockApiResults })
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('London');

      expect(fetch).toHaveBeenCalledWith(
        'https://geocoding-api.open-meteo.com/v1/search?name=London&count=10&language=en&format=json'
      );

      expect(result).toEqual([
        {
          id: 1,
          name: 'London',
          latitude: 51.5074,
          longitude: -0.1278,
          country: 'United Kingdom',
          countryCode: 'GB',
          region: 'England',
          subregion: 'Greater London'
        },
        {
          id: 2,
          name: 'London',
          latitude: 42.9834,
          longitude: -81.2497,
          country: 'Canada',
          countryCode: 'CA',
          region: 'Ontario',
          subregion: 'Middlesex County'
        }
      ]);
    });

    it('should handle empty results from API', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ results: [] })
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('NonExistentCity');

      expect(result).toEqual([]);
    });

    it('should handle API response with partial data', async () => {
      const mockApiResults: GeocodingApiResult[] = [
        {
          id: 1,
          name: 'TestCity',
          latitude: 50.0,
          longitude: 10.0,
          country: 'TestCountry',
          country_code: 'TC',
          admin1: undefined,
          admin3: undefined
        }
      ];

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ results: mockApiResults })
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('TestCity');

      expect(result).toEqual([
        {
          id: 1,
          name: 'TestCity',
          latitude: 50.0,
          longitude: 10.0,
          country: 'TestCountry',
          countryCode: 'TC',
          region: undefined,
          subregion: undefined
        }
      ]);
    });

    it('should return "error" when API returns non-ok response', async () => {
      const mockResponse = {
        ok: false,
        status: 404
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('InvalidCity');

      expect(result).toBe('error');
    });

    it('should return "error" when fetch throws an error', async () => {
      (fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await getGeo('TestCity');

      expect(result).toBe('error');
    });

    it('should return "error" when JSON parsing fails', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('TestCity');

      expect(result).toBe('error');
    });

    it('should handle special characters in city name', async () => {
      const cityWithSpecialChars = 'São Paulo';
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ results: [] })
      };

      (fetch as any).mockResolvedValue(mockResponse);

      await getGeo(cityWithSpecialChars);

      expect(fetch).toHaveBeenCalledWith(
        'https://geocoding-api.open-meteo.com/v1/search?name=São Paulo&count=10&language=en&format=json'
      );
    });

    it('should handle empty city name', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ results: [] })
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('');

      expect(fetch).toHaveBeenCalledWith(
        'https://geocoding-api.open-meteo.com/v1/search?name=&count=10&language=en&format=json'
      );
      expect(result).toEqual([]);
    });

    it('should handle API response with missing results property', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({})
      };

      (fetch as any).mockResolvedValue(mockResponse);

      const result = await getGeo('TestCity');

      expect(result).toBe('error');
    });

    it('should handle various HTTP error status codes', async () => {
      const statusCodes = [400, 401, 403, 404, 500, 502, 503];

      for (const statusCode of statusCodes) {
        const mockResponse = {
          ok: false,
          status: statusCode
        };

        (fetch as any).mockResolvedValue(mockResponse);

        const result = await getGeo('TestCity');

        expect(result).toBe('error');
      }
    });
  });
});