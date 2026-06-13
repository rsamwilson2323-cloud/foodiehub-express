import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
