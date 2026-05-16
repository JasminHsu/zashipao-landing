import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  light?: boolean;
};

export function SectionHeading({ label, title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <>
      <div className="mb-3 text-xs font-bold uppercase tracking-[.1em] text-terracotta">{label}</div>
      <h2 className={`rv mb-4 font-serif text-4xl font-black leading-[1.3] tracking-normal ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`rv max-w-[520px] text-[1.02rem] leading-[1.75] ${light ? "text-white/55" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
    </>
  );
}
