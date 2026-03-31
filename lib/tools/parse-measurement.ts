export function parsePositiveMeasurement(raw: string): number | undefined {
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

export function parseAgeYears(raw: string): number | undefined {
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 && value < 130 ? value : undefined;
}
