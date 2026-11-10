'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { browserAuth } from '@/lib/supabase/browser';
import { AccountMenu } from './AccountMenu';

const publicLinks = [
  { href: '/#how', label: '怎麼運作' },
  { href: '/#sessions', label: '場次' }
];

const memberLinks = [
  { href: '/sessions', label: '可預約場次' },
  { href: '/my-sessions', label: '我的場次' },
  { href: '/tasks', label: '待辦清單' }
];

export function NavigationMenu() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const { data: { subscription } } = browserAuth().auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const links = signedIn ? memberLinks : publicLinks;
  const closeMobileMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false; };

  return (
    <div className="flex min-w-0 items-center justify-end gap-6 max-[760px]:gap-3">
      <nav aria-label="主要導覽" className="flex min-w-0 items-center gap-6 max-[760px]:hidden">
        {signedIn === null ? <span className="text-sm text-ink/55" role="status">載入中…</span> : links.map(link => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap text-sm text-ink/70 no-underline transition-colors hover:text-ink">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="max-[760px]:hidden"><AccountMenu /></div>

      <details ref={mobileMenu} className="relative hidden max-[760px]:block" onKeyDown={event => {
        if (event.key === 'Escape') { closeMobileMenu(); mobileMenu.current?.querySelector('summary')?.focus(); }
      }}>
        <summary
          aria-label="開啟導覽選單"
          className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md border border-black/20 bg-white text-ink [&::-webkit-details-marker]:hidden"
          onKeyDown={event => {
            if ((event.key === 'Enter' || event.key === ' ') && mobileMenu.current) {
              event.preventDefault();
              mobileMenu.current.open = !mobileMenu.current.open;
            }
          }}
        >
          <span aria-hidden="true" className="grid gap-1">
            <span className="block h-0.5 w-5 bg-current" /><span className="block h-0.5 w-5 bg-current" /><span className="block h-0.5 w-5 bg-current" />
          </span>
        </summary>
        <div className="absolute right-0 top-[calc(100%+.65rem)] w-[min(19rem,88vw)] rounded-md border border-black/15 bg-[#FFFDF8] p-4 shadow-lift">
          <nav aria-label="手機導覽" className="grid gap-1">
            {signedIn === null ? <span className="px-3 py-2 text-sm text-ink/55" role="status">載入中…</span> : links.map(link => (
              <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="rounded-md px-3 py-3 text-base font-semibold text-ink no-underline hover:bg-black/5">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-black/10 pt-3" onClick={closeMobileMenu}><AccountMenu /></div>
        </div>
      </details>
    </div>
  );
}
