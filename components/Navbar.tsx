import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-[62px] items-center justify-between border-b border-border bg-cream/95 px-[6%] backdrop-blur-xl">
      <Logo />
      <div className="flex items-center gap-6 max-[720px]:gap-3">
        <a className="text-sm text-muted no-underline transition-colors hover:text-ink max-[720px]:hidden" href="#how">
          怎麼運作
        </a>
        <a className="text-sm text-muted no-underline transition-colors hover:text-ink max-[720px]:hidden" href="#features">
          功能
        </a>
        <a className="text-sm text-muted no-underline transition-colors hover:text-ink max-[720px]:hidden" href="#sessions">
          今日場次
        </a>
        <ButtonLink href="/login" variant="outline" className="px-5 py-2 max-[520px]:hidden">
          登入
        </ButtonLink>
        <ButtonLink href="/signup" className="px-5 py-2">
          免費加入
        </ButtonLink>
      </div>
    </nav>
  );
}
