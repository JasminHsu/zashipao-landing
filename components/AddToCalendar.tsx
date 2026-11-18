'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { calendarOrigin, googleCalendarUrl, sessionIcs, type CalendarSession } from '@/lib/sessionCalendar';
import { useTimeZone } from './TimeZoneProvider';

export function AddToCalendar({ session }: { session: CalendarSession }) {
  const { timeZone } = useTimeZone();
  const [origin, setOrigin] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOrigin(calendarOrigin(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin));
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerButton.current?.focus();
    };
  }, [open]);

  const downloadCalendar = () => {
    const url = URL.createObjectURL(new Blob([sessionIcs(session, origin)], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `zashipao-${session.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    setOpen(false);
  };

  return <>
    <button
      ref={triggerButton}
      type="button"
      aria-haspopup="dialog"
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-paper px-4 py-2 text-sm font-bold text-muted transition-colors hover:bg-cream hover:text-ink"
      onClick={() => setOpen(true)}
    >
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M12 15v4M10 17h4"/></svg>
      加入行事曆
    </button>
    {open ? <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 p-4"
      onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-md rounded-lg border border-border bg-paper p-6 shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-black">加入行事曆</h2>
            <p className="mt-2 text-sm text-muted">選擇你使用的行事曆。</p>
          </div>
          <button ref={closeButton} type="button" aria-label="關閉加入行事曆視窗" title="關閉" className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink" onClick={() => setOpen(false)}>
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          <a href={googleCalendarUrl(session, origin, timeZone)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between rounded-lg border border-border bg-paper px-4 py-3 text-sm font-bold hover:bg-cream" onClick={() => setOpen(false)}>
            Google Calendar
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 4h6v6M20 4 10 14M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></svg>
          </a>
          <button type="button" className="min-h-11 rounded-lg border border-border bg-paper px-4 py-3 text-left text-sm font-bold hover:bg-cream" onClick={downloadCalendar}>Apple／Outlook</button>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted">請開啟後確認儲存並設定提醒。取消預約或改期不會自動同步，請自行更新。</p>
      </section>
    </div> : null}
  </>;
}
