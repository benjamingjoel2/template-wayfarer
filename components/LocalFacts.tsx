"use client";

import { useEffect, useState } from "react";
import site from "@/site.config";
import { pad2 } from "@/lib/brand";
import { gmtLabel, sunriseUtc, zonedParts } from "@/lib/sun";

const { timeZone, sunrise, months } = site.destination;

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function LocalClock() {
  const now = useNow();
  if (!now) return <span className="tabular-nums">--:--</span>;
  const p = zonedParts(now, timeZone);
  return (
    <>
      <time dateTime={now.toISOString()} className="tabular-nums" aria-label={`${pad2(p.hour)}:${pad2(p.minute)}`}>
        {pad2(p.hour)}
        <span className="blink" aria-hidden="true">
          :
        </span>
        {pad2(p.minute)}
      </time>{" "}
      <span className="text-accent">({gmtLabel(now, timeZone)})</span>
    </>
  );
}

export function ThisMonth() {
  const now = useNow();
  if (!now) return <span> </span>;
  const p = zonedParts(now, timeZone);
  return <span>{months[p.month - 1] ?? ""}</span>;
}

export function Sunrise() {
  const now = useNow();
  if (!now) return <span className="tabular-nums">--:--</span>;
  const p = zonedParts(now, timeZone);
  const t = sunriseUtc(p.year, p.month, p.day, sunrise.lat, sunrise.lng);
  if (t === null) return <span>—</span>;
  const s = zonedParts(new Date(t), timeZone);
  return <span className="tabular-nums">{`${pad2(s.hour)}:${pad2(s.minute)}`}</span>;
}
