export type Sex = "male" | "female";

export function computeBmi(weightKg: number, heightM: number): number | null {
  if (!(weightKg > 0 && heightM > 0)) return null;
  return weightKg / (heightM * heightM);
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function computeBmrMifflinStJeor(input: {
  weightKg: number;
  heightCm: number;
  ageYears: number;
  sex: Sex;
}): number | null {
  const { weightKg, heightCm, ageYears, sex } = input;
  if (!(weightKg > 0 && heightCm > 0 && ageYears > 0)) return null;
  const line = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "male" ? line + 5 : line - 161;
}

export function lbToKg(lb: number): number {
  return lb * 0.45359237;
}

export function inchesToMeters(inches: number): number {
  return inches * 0.0254;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}
