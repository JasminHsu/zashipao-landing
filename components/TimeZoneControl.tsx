"use client";

import { timeZoneAbbreviation, timeZoneOptions } from "@/lib/timeZone";
import { useTimeZone } from "./TimeZoneProvider";

export function TimeZoneControl({ compact = false }: { compact?: boolean }) {
  const { ready, timeZone, deviceZone, isManual, chooseTimeZone, restoreDeviceTimeZone } = useTimeZone();
  const otherOptions = timeZoneOptions.filter(option => option.value !== deviceZone);
  const abbreviation = ready ? timeZoneAbbreviation(timeZone) : "…";

  return (
    <div className={compact ? "text-xs" : "text-sm"}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-forest">
          顯示時區：{abbreviation}{ready && !isManual ? "（裝置時區）" : ""}
        </span>
        <label className="sr-only" htmlFor={compact ? "account-time-zone" : "session-time-zone"}>選擇其他時區</label>
        <select
          id={compact ? "account-time-zone" : "session-time-zone"}
          value={isManual ? timeZone : ""}
          disabled={!ready}
          onChange={event => {
            if (event.target.value) chooseTimeZone(event.target.value);
          }}
          className="min-h-10 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-ink focus-visible:outline-terracotta disabled:opacity-50"
        >
          <option value="">選擇其他時區</option>
          {otherOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label} · {timeZoneAbbreviation(option.value)}
            </option>
          ))}
        </select>
        {isManual ? (
          <button type="button" className="min-h-10 px-2 text-xs text-muted underline hover:text-ink" onClick={restoreDeviceTimeZone}>
            恢復裝置時區
          </button>
        ) : null}
      </div>
    </div>
  );
}
