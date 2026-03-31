"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type ToolPromoCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  onOpen: () => void;
  className?: string;
};

export function ToolPromoCard({
  imageSrc,
  imageAlt,
  title,
  description,
  onOpen,
  className,
}: ToolPromoCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-xl border border-emerald-500/25 bg-card p-6 text-left shadow-sm transition-all",
        "hover:border-emerald-500/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-500/30 via-emerald-600/12 to-transparent dark:from-emerald-400/22 dark:via-emerald-950/30"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-28 shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain object-left invert dark:invert-0"
              sizes="112px"
              priority={false}
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-base tracking-tight">{title}</h3>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <span className="mt-auto pt-2 font-medium text-emerald-700 text-sm dark:text-emerald-400">
          Open calculator →
        </span>
      </div>
    </button>
  );
}
