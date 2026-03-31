"use client";

import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CalculatorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function CalculatorDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: CalculatorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    const onDialogClick = (event: MouseEvent) => {
      if (event.target === el) onOpenChange(false);
    };

    el.addEventListener("click", onDialogClick);
    return () => el.removeEventListener("click", onDialogClick);
  }, [onOpenChange]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed top-1/2 left-1/2 z-50 w-[min(100vw-2rem,44rem)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-0 text-card-foreground shadow-xl",
        "backdrop:bg-black/50 backdrop:backdrop-blur-[2px]",
      )}
      onClose={() => onOpenChange(false)}
    >
      <div className="max-h-[min(85vh,640px)] overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
            {description ? (
              <p className="mt-1 text-muted-foreground text-sm">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="shrink-0 rounded-md border border-transparent p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  );
}
