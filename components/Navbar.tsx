import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FFFDF8]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-6 px-[5%]">
        <Logo />
        <NavigationMenu />
      </div>
    </header>
  );
}
