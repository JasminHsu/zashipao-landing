"use client";

import { useMemo, useState } from "react";
import type { PublicSession } from "@/lib/publicSessions";
import { formatSessionDate, formatSessionTime, timeZoneAbbreviation } from "@/lib/timeZone";
import { SessionBookingAction, SessionBookingStatus, useSessionBookingStatus } from "./SessionBookingStatus";
import { useTimeZone } from "./TimeZoneProvider";

export function AvailableSessionsList({ sessions, tasks, failed }: {
  sessions: PublicSession[];
  tasks: string;
  failed: boolean;
}) {
  const { timeZone } = useTimeZone();
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const dateKey = (value: string) => new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date(value));
  const dates = useMemo(() => Array.from(new Set(sessions.map(session => dateKey(session.starts_at)))), [sessions, timeZone]);
  const filtered = sessions.filter(session => {
    if (date && dateKey(session.starts_at) !== date) return false;
    if (!period) return true;
    const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(new Date(session.starts_at)));
    return period === "morning" ? hour < 12 : period === "afternoon" ? hour >= 12 && hour < 18 : hour >= 18;
  });

  return (
    <>
      {sessions.length > 1 ? <div className="mt-5 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-cream p-4" aria-label="篩選場次">
        <label className="grid gap-1 text-xs font-semibold text-muted">日期
          <select value={date} onChange={event => setDate(event.target.value)} className="min-h-11 rounded-lg border border-border bg-white px-3 text-sm text-ink">
            <option value="">全部日期</option>
            {dates.map(value => {
              const session = sessions.find(item => dateKey(item.starts_at) === value)!;
              return <option key={value} value={value}>{formatSessionDate(session.starts_at, timeZone)}</option>;
            })}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-semibold text-muted">時段
          <select value={period} onChange={event => setPeriod(event.target.value)} className="min-h-11 rounded-lg border border-border bg-white px-3 text-sm text-ink">
            <option value="">全部時段</option>
            <option value="morning">上午</option>
            <option value="afternoon">下午</option>
            <option value="evening">晚上</option>
          </select>
        </label>
        {date || period ? <button type="button" onClick={() => { setDate(""); setPeriod(""); }} className="min-h-11 px-2 text-sm text-muted underline hover:text-ink">清除篩選</button> : null}
      </div> : null}
      <SessionBookingStatus>
        <div className="mt-6 grid gap-4">
          {failed ? (
            <div role="alert" className="rounded-lg border border-border bg-paper p-6">
              <p>場次暫時無法載入，請稍後再試。</p>
              <a href="/sessions" className="mt-3 inline-block font-bold text-terracotta underline">重新載入</a>
            </div>
          ) : sessions.length === 0 ? (
            <p className="rounded-lg border border-border bg-paper p-6 text-muted">目前沒有即將開始的公開場次，請稍後再來看看。</p>
          ) : filtered.length === 0 ? (
            <p className="rounded-lg border border-border bg-paper p-6 text-muted">這個日期與時段目前沒有場次。請調整篩選條件。</p>
          ) : filtered.map(session => (
            <article key={session.id} className="flex flex-wrap items-center justify-between gap-5 rounded-lg border border-border bg-paper p-6">
              <div>
                <p className="text-sm text-muted">{formatSessionDate(session.starts_at, timeZone)}</p>
                <h2 className="mt-2 text-2xl font-black">{session.title}</h2>
                <p className="mt-2 text-muted">{formatSessionTime(session.starts_at, timeZone)}–{formatSessionTime(session.ends_at, timeZone)} {timeZoneAbbreviation(timeZone, session.starts_at)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <SessionCapacity session={session} />
                <SessionBookingAction sessionId={session.id} full={session.booked_count >= session.capacity} tasks={tasks} />
              </div>
            </article>
          ))}
        </div>
      </SessionBookingStatus>
    </>
  );
}

function SessionCapacity({ session }: { session: PublicSession }) {
  const { loading, bookings } = useSessionBookingStatus();
  if (!loading && bookings[session.id]) return null;
  return <span className="text-sm text-muted">{session.booked_count} / {session.capacity} 人</span>;
}
