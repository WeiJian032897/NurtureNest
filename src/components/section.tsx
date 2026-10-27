import type { ReactNode } from "react";

export function Section({ id, tone = "cream", children }: {
  id: string;
  tone?: "cream" | "white" | "sage";
  children: ReactNode;
}) {
  const toneClass = { cream: "bg-[#fbf7ef]", white: "bg-white", sage: "bg-[#eef2e8]" }[tone];
  return (
    <section id={id} className={`${toneClass} px-5 py-24 sm:px-8 lg:px-10`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
