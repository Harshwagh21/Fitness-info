import { Suspense } from "react";
import { ToolsPageClient } from "@/components/tools/tools-page-client";

function ToolsPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted mx-auto" />
      <div className="h-4 w-full max-w-md animate-pulse rounded-md bg-muted mx-auto" />
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="h-48 animate-pulse rounded-xl border border-border bg-muted/40"
          />
        ))}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsPageFallback />}>
      <ToolsPageClient />
    </Suspense>
  );
}
