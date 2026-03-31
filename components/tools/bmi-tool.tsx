"use client";

import { useMemo, useState } from "react";
import { UnitToggle } from "@/components/tools/unit-toggle";
import { Input } from "@/components/ui/input";
import {
  bmiCategory,
  computeBmi,
  inchesToMeters,
  lbToKg,
} from "@/lib/tools/bmi-bmr";
import { parsePositiveMeasurement } from "@/lib/tools/parse-measurement";

const labelClass = "text-sm font-medium leading-none";

export function BmiCalculatorForm() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  const result = useMemo(() => {
    if (unit === "metric") {
      const h = parsePositiveMeasurement(heightCm);
      const w = parsePositiveMeasurement(weightKg);
      if (h === undefined || w === undefined) return null;
      return computeBmi(w, h / 100);
    }
    const inches = parsePositiveMeasurement(heightIn);
    const lb = parsePositiveMeasurement(weightLb);
    if (inches === undefined || lb === undefined) return null;
    return computeBmi(lbToKg(lb), inchesToMeters(inches));
  }, [unit, heightCm, weightKg, heightIn, weightLb]);

  return (
    <div className="flex flex-col gap-4">
      <UnitToggle value={unit} onChange={setUnit} />
      {unit === "metric" ? (
        <div className="flex flex-col gap-3">
          <div className="grid gap-2">
            <label htmlFor="bmi-height-cm" className={labelClass}>
              Height (cm)
            </label>
            <Input
              id="bmi-height-cm"
              inputMode="decimal"
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(event) => setHeightCm(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="bmi-weight-kg" className={labelClass}>
              Weight (kg)
            </label>
            <Input
              id="bmi-weight-kg"
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
            <label htmlFor="bmi-height-in" className={labelClass}>
              Height (inches)
            </label>
            <Input
              id="bmi-height-in"
              inputMode="decimal"
              placeholder="e.g. 69"
              value={heightIn}
              onChange={(event) => setHeightIn(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="bmi-weight-lb" className={labelClass}>
              Weight (lb)
            </label>
            <Input
              id="bmi-weight-lb"
              inputMode="decimal"
              placeholder="e.g. 154"
              value={weightLb}
              onChange={(event) => setWeightLb(event.target.value)}
            />
          </div>
        </div>
      )}
      <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        {result === null ? (
          <p className="text-muted-foreground">Enter valid measurements.</p>
        ) : (
          <>
            <p className="font-semibold text-lg tabular-nums">
              {result.toFixed(1)}
            </p>
            <p className="text-muted-foreground">{bmiCategory(result)}</p>
          </>
        )}
      </div>
    </div>
  );
}
