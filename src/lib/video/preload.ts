const preloaded = new Set<string>();

/**
 * Warm the browser's cache for an upcoming scene's clip without attaching it
 * to the DOM. Used for the "relay" preloading strategy in
 * implementation/performance-budget.md — only the next likely clip is
 * fetched, never the whole chain up front.
 */
export function preloadVideo(src?: string) {
  if (!src || preloaded.has(src) || typeof window === "undefined") return;
  preloaded.add(src);
  const el = document.createElement("video");
  el.preload = "auto";
  el.muted = true;
  el.src = src;
  el.load();
}
