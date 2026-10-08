const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Parses "July 2024", "Sept 2026" or "Jan 2022" into the first day of that month. */
export function parseMonth(label: string): Date | null {
  const match = label.trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  return month < 0 ? null : new Date(Number(match[2]), month, 1);
}

export interface Period {
  start: Date | null;
  /** null when the period is open-ended ("Present"). */
  end: Date | null;
  startLabel: string;
  endLabel: string;
}

/** Parses "June 2026 - Sept 2026" or "Jan 2022 - Present". */
export function parsePeriod(period: string): Period {
  const [a = "", b = ""] = period.split(/\s+[-–—]\s+/);
  const openEnded = !b || /present|now|current/i.test(b);
  return {
    start: parseMonth(a),
    end: openEnded ? null : parseMonth(b),
    startLabel: a.trim(),
    endLabel: openEnded ? "Present" : b.trim(),
  };
}

/** True while the period's final month hasn't finished yet. */
export function isOngoing(period: string, now = new Date()): boolean {
  const { end } = parsePeriod(period);
  if (!end) return true;
  return new Date(end.getFullYear(), end.getMonth() + 1, 1) > now;
}

/** LinkedIn-style inclusive duration: "3 yrs 7 mos". */
export function formatDuration(start: Date | null, end: Date | null, now = new Date()): string {
  if (!start) return "";
  const last = end ?? now;
  const months =
    (last.getFullYear() - start.getFullYear()) * 12 + (last.getMonth() - start.getMonth()) + 1;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, rem && `${rem} mo${rem > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}
