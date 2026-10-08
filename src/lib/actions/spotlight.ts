import type { Action } from "svelte/action";

/**
 * Tracks the pointer over an element and exposes its position as the
 * `--mx` / `--my` CSS variables, which `.card-spotlight` uses to draw a
 * glowing border that follows the cursor.
 */
export const spotlight: Action<HTMLElement> = (node) => {
  node.classList.add("card-spotlight");

  function onMove(event: PointerEvent) {
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  node.addEventListener("pointermove", onMove);
  return {
    destroy() {
      node.removeEventListener("pointermove", onMove);
    },
  };
};
