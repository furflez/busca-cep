import { zipcodeSanitize } from './zipcodeSanitize';

describe('Zipcode Sanitize function tests', () => {
  it('Remove letters and returns only numbers string', () => {
    expect(zipcodeSanitize('88500ABba000')).toBe('88500000');
  });

  it('Remove special characters and returns only numbers string', () => {
    expect(zipcodeSanitize('88500-000')).toBe('88500000');
  });

  it('remove regex and return only numbers string', () => {
    expect(zipcodeSanitize('88500\n\t000')).toBe('88500000');
  });

  it('remove letters and return empty string', () => {
    expect(zipcodeSanitize('abcdefghij')).toBe('');
  });
});
