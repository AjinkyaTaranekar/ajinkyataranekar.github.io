import { dev } from "$app/environment";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    /** Defined inline in app.html; only reports from the live site. */
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. Event and parameter names are snake_case; see the list of
 * events in the README so GA4 custom dimensions stay in sync.
 */
export function track(event: string, params: Params = {}) {
  if (dev) console.debug("[analytics]", event, params);
  window.gtag?.("event", event, params);
}

/**
 * Document-level click handler for declarative tracking: any element with
 * `data-track="event_name"` sends that event, and each `data-track-*`
 * attribute becomes a parameter (`data-track-link-type="source"` -> `link_type`).
 */
export function trackClick(event: MouseEvent) {
  const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
  if (!el?.dataset.track) return;

  const params: Params = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (key === "track" || !key.startsWith("track")) continue;
    params[key.slice(5).replace(/[A-Z]/g, (c, i) => (i ? "_" : "") + c.toLowerCase())] = value;
  }
  track(el.dataset.track, params);
}

/**
 * Sends `section_view` once per section (with its 1-based `section_index` in
 * page order) after it has filled the upper half of the viewport for `dwell`
 * ms, so smooth-scrolling past a section on the way to another doesn't count.
 * The highest index reached shows how far down the page a visit got.
 */
export function trackSections(ids: string[], dwell = 1000) {
  const seen = new Set<string>();
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (seen.has(id)) continue;
        clearTimeout(timers.get(id));
        if (!entry.isIntersecting) continue;
        timers.set(
          id,
          setTimeout(() => {
            seen.add(id);
            observer.unobserve(entry.target);
            track("section_view", { section: id, section_index: ids.indexOf(id) + 1 });
          }, dwell),
        );
      }
    },
    { rootMargin: "0px 0px -50% 0px" },
  );
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
  return () => {
    observer.disconnect();
    timers.forEach(clearTimeout);
  };
}
