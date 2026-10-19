import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-black/10 bg-[#FFFDF8]/95 px-[5%] backdrop-blur-xl">
      <Logo />
      <div className="flex items-center gap-7 max-[720px]:gap-2.5">
        <a className="text-sm text-ink/65 no-underline transition-colors hover:text-ink max-[760px]:hidden" href="#how">
          怎麼運作
        </a>
        <a className="text-sm text-ink/65 no-underline transition-colors hover:text-ink max-[760px]:hidden" href="#sessions">
          場次
        </a>
        <a className="text-sm text-ink/65 no-underline transition-colors hover:text-ink max-[760px]:hidden" href="/tasks">
          待辦清單
        </a>
        <ButtonLink href="/login" variant="outline" className="border-black/20 bg-white px-5 py-2 max-[520px]:hidden">
          登入
        </ButtonLink>
        <ButtonLink href="/login" className="bg-[#244D3D] px-5 py-2.5 text-white hover:bg-ink">
          免費加入
        </ButtonLink>
      </div>
    </nav>
  );
}
