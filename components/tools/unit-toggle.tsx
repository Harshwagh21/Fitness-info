"use client";

import { cn } from "@/lib/utils";

type UnitToggleProps = {
  value: "metric" | "imperial";
  onChange: (value: "metric" | "imperial") => void;
  className?: string;
};

export function UnitToggle({ value, onChange, className }: UnitToggleProps) {
  return (
    <fieldset
      className={cn(
        "m-0 inline-flex h-9 min-w-0 flex-row rounded-lg border border-input bg-muted p-0.5",
        className,
      )}
    >
      <legend className="sr-only">Unit system</legend>
      {(["metric", "imperial"] as const).map((unit) => (
        <button
          key={unit}
          type="button"
          aria-pressed={value === unit}
          onClick={() => onChange(unit)}
          className={cn(
            "rounded-md px-3 text-sm font-medium transition-colors",
            value === unit
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {unit === "metric" ? "Metric" : "Imperial"}
        </button>
      ))}
    </fieldset>
  );
}
