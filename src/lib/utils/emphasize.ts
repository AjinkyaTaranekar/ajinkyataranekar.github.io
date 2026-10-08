export interface Segment {
  text: string;
  em: boolean;
}

// Numbers with optional unit/suffix ("1,400+", "91.7%", "150ms", "100K+",
// "5 minutes") and before → after transitions ("weeks → days").
const METRIC =
  /(\b\d[\d,.]*(?:\s?(?:%|\+|K\+?|M\+?|ms|s\b|x\b|min(?:utes)?\b|sec\b))*(?:\s?→\s?\d[\d,.]*\s?(?:ms|s\b|%|min(?:utes)?\b)?)?|\b\w+\s?→\s?[\w.]+(?:\s(?:minutes|days|week|weeks|seconds))?)/g;

/**
 * Splits a sentence into plain and emphasised segments so impact metrics
 * can be highlighted without resorting to {@html}.
 */
export function emphasize(text: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(METRIC)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ text: text.slice(last, index), em: false });
    segments.push({ text: match[0], em: true });
    last = index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), em: false });
  return segments;
}
