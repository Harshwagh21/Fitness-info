"use client";

import { useMemo, useState } from "react";
import { UnitToggle } from "@/components/tools/unit-toggle";
import { Input } from "@/components/ui/input";
import {
  ACTIVITY_LEVELS,
  type ActivityLevelId,
  computeTdee,
} from "@/lib/tools/activity-levels";
import {
  computeBmrMifflinStJeor,
  inchesToCm,
  lbToKg,
  type Sex,
} from "@/lib/tools/bmi-bmr";
import {
  parseAgeYears,
  parsePositiveMeasurement,
} from "@/lib/tools/parse-measurement";

const labelClass = "text-sm font-medium leading-none";

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30";

export function TdeeCalculatorForm() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [activityId, setActivityId] = useState<ActivityLevelId>("moderate");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  const activityFactor =
    ACTIVITY_LEVELS.find((level) => level.id === activityId)?.factor ?? 1.55;

  const bmr = useMemo(() => {
    const ageYears = parseAgeYears(age);
    if (ageYears === undefined) return null;
    if (unit === "metric") {
      const h = parsePositiveMeasurement(heightCm);
      const w = parsePositiveMeasurement(weightKg);
      if (h === undefined || w === undefined) return null;
      return computeBmrMifflinStJeor({
        weightKg: w,
        heightCm: h,
        ageYears,
        sex,
      });
    }
    const inches = parsePositiveMeasurement(heightIn);
    const lb = parsePositiveMeasurement(weightLb);
    if (inches === undefined || lb === undefined) return null;
    return computeBmrMifflinStJeor({
      weightKg: lbToKg(lb),
      heightCm: inchesToCm(inches),
      ageYears,
      sex,
    });
  }, [unit, sex, age, heightCm, weightKg, heightIn, weightLb]);

  const tdee = bmr === null ? null : computeTdee(bmr, activityFactor);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <label htmlFor="tdee-sex" className={labelClass}>
          Sex
        </label>
        <select
          id="tdee-sex"
          value={sex}
          onChange={(event) => setSex(event.target.value as Sex)}
          className={selectClass}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="tdee-age" className={labelClass}>
          Age (years)
        </label>
        <Input
          id="tdee-age"
          inputMode="numeric"
          placeholder="e.g. 30"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="tdee-activity" className={labelClass}>
          Activity level
        </label>
        <select
          id="tdee-activity"
          value={activityId}
          onChange={(event) =>
            setActivityId(event.target.value as ActivityLevelId)
          }
          className={selectClass}
        >
          {ACTIVITY_LEVELS.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </select>
      </div>
      <UnitToggle value={unit} onChange={setUnit} />
      {unit === "metric" ? (
        <div className="flex flex-col gap-3">
          <div className="grid gap-2">
            <label htmlFor="tdee-height-cm" className={labelClass}>
              Height (cm)
            </label>
            <Input
              id="tdee-height-cm"
              inputMode="decimal"
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(event) => setHeightCm(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tdee-weight-kg" className={labelClass}>
              Weight (kg)
            </label>
            <Input
              id="tdee-weight-kg"
              inputMode="decimal"
              placeholder="e.g. 70"
              value={weightKg}
              onChange={(event) => setWeightKg(event.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid gap-2">
            <label htmlFor="tdee-height-in" className={labelClass}>
              Height (inches)
            </label>
            <Input
              id="tdee-height-in"
              inputMode="decimal"
              placeholder="e.g. 69"
              value={heightIn}
              onChange={(event) => setHeightIn(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tdee-weight-lb" className={labelClass}>
              Weight (lb)
            </label>
            <Input
              id="tdee-weight-lb"
              inputMode="decimal"
              placeholder="e.g. 154"
              value={weightLb}
              onChange={(event) => setWeightLb(event.target.value)}
            />
          </div>
        </div>
      )}
      <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        {bmr === null || tdee === null ? (
          <p className="text-muted-foreground">
            Enter sex, age, activity, and valid height and weight.
          </p>
        ) : (
          <>
            <p className="font-semibold text-lg tabular-nums">
              {Math.round(tdee)} kcal/day
            </p>
            <p className="text-muted-foreground">
              TDEE (BMR × activity). BMR ≈ {Math.round(bmr)} kcal/day.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
