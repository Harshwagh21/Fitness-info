"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BmiCalculatorForm } from "@/components/tools/bmi-tool";
import { BmrCalculatorForm } from "@/components/tools/bmr-tool";
import { CalculatorDialog } from "@/components/tools/calculator-dialog";
import { TdeeCalculatorForm } from "@/components/tools/tdee-tool";
import { ToolPromoCard } from "@/components/tools/tool-promo-card";

type OpenTool = "bmi" | "bmr" | "tdee" | null;

function toolFromParam(value: string | null): Exclude<OpenTool, null> | null {
  if (value === "bmi" || value === "bmr" || value === "tdee") return value;
  return null;
}

export function ToolsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openTool = useMemo(
    () => toolFromParam(searchParams.get("tool")),
    [searchParams],
  );

  const setOpenTool = useCallback(
    (nextTool: OpenTool) => {
      const next = new URLSearchParams(searchParams.toString());
      if (nextTool) next.set("tool", nextTool);
      else next.delete("tool");

      const nextUrl = next.size ? `${pathname}?${next.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8">
        <header className="text-center">
          <h1 className="font-bold text-2xl tracking-tight">Fitness tools</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Quick calculators for planning and reference only; not medical
            advice.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          <ToolPromoCard
            imageSrc="/logo/bmi.png"
            imageAlt="BMI calculator"
            title="BMI"
            description="Body mass index from height and weight with standard categories."
            onOpen={() => setOpenTool("bmi")}
          />
          <ToolPromoCard
            imageSrc="/logo/bmr.png"
            imageAlt="BMR calculator"
            title="BMR"
            description="Basal metabolic rate using Mifflin–St Jeor (calories at rest)."
            onOpen={() => setOpenTool("bmr")}
          />
          <ToolPromoCard
            imageSrc="/logo/tdee.png"
            imageAlt="TDEE calculator"
            title="TDEE"
            description="Total daily energy expenditure from BMR and activity level."
            onOpen={() => setOpenTool("tdee")}
          />
        </div>
      </div>

      <CalculatorDialog
        open={openTool === "bmi"}
        onOpenChange={(open) => !open && setOpenTool(null)}
        title="BMI calculator"
        description="Body mass index from height and weight (WHO categories)."
      >
        <BmiCalculatorForm />
      </CalculatorDialog>

      <CalculatorDialog
        open={openTool === "bmr"}
        onOpenChange={(open) => !open && setOpenTool(null)}
        title="BMR calculator"
        description="Basal metabolic rate (Mifflin–St Jeor); calories at rest per day."
      >
        <BmrCalculatorForm />
      </CalculatorDialog>

      <CalculatorDialog
        open={openTool === "tdee"}
        onOpenChange={(open) => !open && setOpenTool(null)}
        title="TDEE calculator"
        description="Total daily energy expenditure = BMR × activity factor."
      >
        <TdeeCalculatorForm />
      </CalculatorDialog>
    </>
  );
}
