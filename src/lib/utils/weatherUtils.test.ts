import { describe, it, expect } from 'vitest';
import { getWeatherCondition, getWeatherDescription } from './weatherUtils';

describe('weatherUtils', () => {
  describe('getWeatherCondition', () => {
    it('should return "sunny" for code 0', () => {
      expect(getWeatherCondition(0)).toBe('sunny');
    });

    it('should return "mainly-clear" for code 1', () => {
      expect(getWeatherCondition(1)).toBe('mainly-clear');
    });

    it('should return "partly-cloudy" for code 2', () => {
      expect(getWeatherCondition(2)).toBe('partly-cloudy');
    });

    it('should return "overcast" for codes 3, 45, 48', () => {
      expect(getWeatherCondition(3)).toBe('overcast');
      expect(getWeatherCondition(45)).toBe('overcast');
      expect(getWeatherCondition(48)).toBe('overcast');
    });

    it('should return "drizzle" for codes 51, 53, 55, 56, 57', () => {
      expect(getWeatherCondition(51)).toBe('drizzle');
      expect(getWeatherCondition(53)).toBe('drizzle');
      expect(getWeatherCondition(55)).toBe('drizzle');
      expect(getWeatherCondition(56)).toBe('drizzle');
      expect(getWeatherCondition(57)).toBe('drizzle');
    });

    it('should return rain conditions for various rain codes', () => {
      expect(getWeatherCondition(61)).toBe('rainy-slight');
      expect(getWeatherCondition(63)).toBe('rainy-moderate');
      expect(getWeatherCondition(65)).toBe('rainy-heavy');
      expect(getWeatherCondition(66)).toBe('rainy-showers-slight');
      expect(getWeatherCondition(80)).toBe('rainy-showers-slight');
      expect(getWeatherCondition(81)).toBe('rainy-showers-moderate');
      expect(getWeatherCondition(67)).toBe('rainy-showers-heavy');
      expect(getWeatherCondition(82)).toBe('rainy-showers-heavy');
    });

    it('should return snow conditions for various snow codes', () => {
      expect(getWeatherCondition(71)).toBe('snowy-slight');
      expect(getWeatherCondition(73)).toBe('snowy-moderate');
      expect(getWeatherCondition(75)).toBe('snowy-heavy');
      expect(getWeatherCondition(85)).toBe('snowy-showers-slight');
      expect(getWeatherCondition(86)).toBe('snowy-showers-heavy');
      expect(getWeatherCondition(77)).toBe('snowy-showers-heavy');
    });

    it('should return "thunderstorm" for codes 95, 96, 99', () => {
      expect(getWeatherCondition(95)).toBe('thunderstorm');
      expect(getWeatherCondition(96)).toBe('thunderstorm');
      expect(getWeatherCondition(99)).toBe('thunderstorm');
    });

    it('should return "cloudy" for undefined code', () => {
      expect(getWeatherCondition(undefined)).toBe('cloudy');
    });

    it('should return "cloudy" for unknown codes', () => {
      expect(getWeatherCondition(999)).toBe('cloudy');
      expect(getWeatherCondition(-1)).toBe('cloudy');
      expect(getWeatherCondition(100)).toBe('cloudy');
    });
  });

  describe('getWeatherDescription', () => {
    it('should return "sunny" for code 0', () => {
      expect(getWeatherDescription(0)).toBe('sunny');
    });

    it('should return "cloudy" for codes 1 and 2', () => {
      expect(getWeatherDescription(1)).toBe('cloudy');
      expect(getWeatherDescription(2)).toBe('cloudy');
    });

    it('should return "overcast" for codes 3, 45, 48', () => {
      expect(getWeatherDescription(3)).toBe('overcast');
      expect(getWeatherDescription(45)).toBe('overcast');
      expect(getWeatherDescription(48)).toBe('overcast');
    });

    it('should return "drizzle" for codes 51, 53, 55, 56, 57', () => {
      expect(getWeatherDescription(51)).toBe('drizzle');
      expect(getWeatherDescription(53)).toBe('drizzle');
      expect(getWeatherDescription(55)).toBe('drizzle');
      expect(getWeatherDescription(56)).toBe('drizzle');
      expect(getWeatherDescription(57)).toBe('drizzle');
    });

    it('should return "rainy" for all rain-related codes', () => {
      const rainyCodes = [61, 63, 65, 66, 80, 81, 67, 82];
      rainyCodes.forEach(code => {
        expect(getWeatherDescription(code)).toBe('rainy');
      });
    });

    it('should return "snowy" for all snow-related codes', () => {
      const snowyCodes = [71, 73, 75, 85, 86, 77];
      snowyCodes.forEach(code => {
        expect(getWeatherDescription(code)).toBe('snowy');
      });
    });

    it('should return "thunderstorm" for codes 95, 96, 99', () => {
      expect(getWeatherDescription(95)).toBe('thunderstorm');
      expect(getWeatherDescription(96)).toBe('thunderstorm');
      expect(getWeatherDescription(99)).toBe('thunderstorm');
    });

    it('should return "cloudy" for undefined code', () => {
      expect(getWeatherDescription(undefined)).toBe('cloudy');
    });

    it('should return "cloudy" for unknown codes', () => {
      expect(getWeatherDescription(999)).toBe('cloudy');
      expect(getWeatherDescription(-1)).toBe('cloudy');
      expect(getWeatherDescription(100)).toBe('cloudy');
    });
  });
});