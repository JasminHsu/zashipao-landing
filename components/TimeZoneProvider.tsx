"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { deviceTimeZone, isValidTimeZone } from "@/lib/timeZone";

const storageKey = "zashipao:time-zone:v1";

type TimeZoneState = {
  ready: boolean;
  timeZone: string;
  deviceZone: string;
  isManual: boolean;
  chooseTimeZone: (value: string) => void;
  restoreDeviceTimeZone: () => void;
};

const TimeZoneContext = createContext<TimeZoneState | null>(null);

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [deviceZone, setDeviceZone] = useState("UTC");
  const [manualZone, setManualZone] = useState<string | null>(null);

  useEffect(() => {
    const detected = deviceTimeZone();
    let saved: string | null = null;
    try {
      const candidate = window.localStorage.getItem(storageKey);
      saved = candidate && isValidTimeZone(candidate) ? candidate : null;
    } catch {}
    setDeviceZone(detected);
    setManualZone(saved);
    setReady(true);
  }, []);

  const value = useMemo<TimeZoneState>(() => ({
    ready,
    timeZone: manualZone ?? deviceZone,
    deviceZone,
    isManual: manualZone !== null,
    chooseTimeZone: value => {
      if (!isValidTimeZone(value)) return;
      try { window.localStorage.setItem(storageKey, value); } catch {}
      setManualZone(value);
    },
    restoreDeviceTimeZone: () => {
      try { window.localStorage.removeItem(storageKey); } catch {}
      setManualZone(null);
    }
  }), [ready, manualZone, deviceZone]);

  return <TimeZoneContext.Provider value={value}>{children}</TimeZoneContext.Provider>;
}

export function useTimeZone() {
  const value = useContext(TimeZoneContext);
  if (!value) throw new Error("useTimeZone must be used inside TimeZoneProvider");
  return value;
}
