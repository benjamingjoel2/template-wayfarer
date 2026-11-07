"use client";

import { useEffect, useState } from "react";

/** Current year. Rendered at build time, then corrected in the browser so it never goes stale. */
export function Year({ initial }: { initial: number }) {
  const [y, setY] = useState(initial);
  useEffect(() => setY(new Date().getFullYear()), []);
  return <>{y}</>;
}
