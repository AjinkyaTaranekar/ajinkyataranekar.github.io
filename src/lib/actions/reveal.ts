import type { Action } from "svelte/action";

interface RevealOptions {
  /** Delay before the element animates in, in ms. */
  delay?: number;
}

// One shared observer for every revealed element on the page.
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      // threshold 0 so very tall blocks reveal as soon as their top edge enters
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
  }
  return observer;
}

/**
 * Fades/blur-slides an element in the first time it scrolls into view.
 * Styling lives in app.css (`.reveal` / `.is-visible`).
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (
  node,
  options,
) => {
  node.classList.add("reveal");
  if (options?.delay) node.style.setProperty("--d", `${options.delay}ms`);

  const io = getObserver();
  io.observe(node);

  return {
    destroy() {
      io.unobserve(node);
    },
  };
};
