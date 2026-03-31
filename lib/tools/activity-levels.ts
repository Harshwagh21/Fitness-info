export type ActivityLevelId =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export const ACTIVITY_LEVELS: ReadonlyArray<{
  id: ActivityLevelId;
  label: string;
  factor: number;
}> = [
  { id: "sedentary", label: "Sedentary (little or no exercise)", factor: 1.2 },
  { id: "light", label: "Light (1–3 days/week)", factor: 1.375 },
  { id: "moderate", label: "Moderate (3–5 days/week)", factor: 1.55 },
  { id: "active", label: "Active (6–7 days/week)", factor: 1.725 },
  {
    id: "very_active",
    label: "Very active (athlete / physical job)",
    factor: 1.9,
  },
];

export function computeTdee(bmr: number, activityFactor: number): number {
  return bmr * activityFactor;
}
