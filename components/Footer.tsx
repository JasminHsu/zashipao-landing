import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = [
  ["使用條款", "/terms"],
  ["隱私政策", "/privacy"]
] as const;

export function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4 bg-ink px-[6%] py-9 text-sm text-white/70 max-[900px]:flex-col max-[900px]:text-center">
      <Logo dark />
      <div className="flex gap-6 max-[720px]:flex-wrap max-[720px]:justify-center">
        {footerLinks.map(([label, href]) => (
          <Link className="text-white/75 no-underline transition-colors hover:text-white" href={href} key={label}>
            {label}
          </Link>
        ))}
      </div>
      <span>© 2026 雜事房 · 線上共做空間</span>
    </footer>
  );
}
