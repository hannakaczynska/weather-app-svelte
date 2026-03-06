import { describe, it, expect } from 'vitest';
import { formatDate } from './formatUtils';

describe('formatUtils', () => {
  describe('formatDate', () => {
    it('should format valid ISO date string correctly', () => {
      expect(formatDate('2024-01-15')).toBe('Mon, Jan 15');
    });

    it('should format different months correctly', () => {
      expect(formatDate('2024-02-28')).toBe('Wed, Feb 28');
      expect(formatDate('2024-03-10')).toBe('Sun, Mar 10');
      expect(formatDate('2024-12-25')).toBe('Wed, Dec 25');
    });

    it('should format different weekdays correctly', () => {
      expect(formatDate('2024-01-14')).toBe('Sun, Jan 14');
      expect(formatDate('2024-01-15')).toBe('Mon, Jan 15');
      expect(formatDate('2024-01-16')).toBe('Tue, Jan 16');
      expect(formatDate('2024-01-17')).toBe('Wed, Jan 17');
      expect(formatDate('2024-01-18')).toBe('Thu, Jan 18');
      expect(formatDate('2024-01-19')).toBe('Fri, Jan 19');
      expect(formatDate('2024-01-20')).toBe('Sat, Jan 20');
    });

    it('should handle leap year dates correctly', () => {
      expect(formatDate('2024-02-29')).toBe('Thu, Feb 29');
    });

    it('should handle edge cases like first and last day of year', () => {
      expect(formatDate('2024-01-01')).toBe('Mon, Jan 1');
      expect(formatDate('2024-12-31')).toBe('Tue, Dec 31');
    });

    it('should handle different date formats', () => {
      expect(formatDate('2024-01-15T10:30:00')).toBe('Mon, Jan 15');
      expect(formatDate('2024-01-15T00:00:00Z')).toBe('Mon, Jan 15');
    });

    it('should handle single digit days correctly', () => {
      expect(formatDate('2024-01-01')).toBe('Mon, Jan 1');
      expect(formatDate('2024-01-05')).toBe('Fri, Jan 5');
      expect(formatDate('2024-01-09')).toBe('Tue, Jan 9');
    });

    it('should handle different years correctly', () => {
      expect(formatDate('2023-01-15')).toBe('Sun, Jan 15');
      expect(formatDate('2025-01-15')).toBe('Wed, Jan 15');
    });

    it('should handle all months correctly', () => {
      expect(formatDate('2024-01-15')).toBe('Mon, Jan 15');
      expect(formatDate('2024-02-15')).toBe('Thu, Feb 15');
      expect(formatDate('2024-03-15')).toBe('Fri, Mar 15');
      expect(formatDate('2024-04-15')).toBe('Mon, Apr 15');
      expect(formatDate('2024-05-15')).toBe('Wed, May 15');
      expect(formatDate('2024-06-15')).toBe('Sat, Jun 15');
      expect(formatDate('2024-07-15')).toBe('Mon, Jul 15');
      expect(formatDate('2024-08-15')).toBe('Thu, Aug 15');
      expect(formatDate('2024-09-15')).toBe('Sun, Sep 15');
      expect(formatDate('2024-10-15')).toBe('Tue, Oct 15');
      expect(formatDate('2024-11-15')).toBe('Fri, Nov 15');
      expect(formatDate('2024-12-15')).toBe('Sun, Dec 15');
    });

    it('should handle invalid date strings', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
      expect(formatDate('')).toBe('Invalid Date');
      expect(formatDate('2024-13-45')).toBe('Invalid Date');
    });

    it('should handle edge date values', () => {
      expect(formatDate('1970-01-01')).toBe('Thu, Jan 1');
      expect(formatDate('2000-02-29')).toBe('Tue, Feb 29'); // Leap year
    });
  });
});