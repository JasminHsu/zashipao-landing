import Link from "next/link";

type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-serif text-[1.35rem] font-black no-underline ${dark ? "text-white" : "text-ink"}`}
    >
      <span
        className="flex size-7 items-center justify-center rounded-full bg-[#F06B4F] text-xs font-black text-white"
      >
        雜
      </span>
      雜事房
    </Link>
  );
}
