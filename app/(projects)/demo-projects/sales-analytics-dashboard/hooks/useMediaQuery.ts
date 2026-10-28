import { useCallback, useSyncExternalStore } from "react";

/**
 * Returns true while the given CSS media query matches, and updates when the
 * screen changes (a phone being rotated, a window being resized).
 *
 * It uses useSyncExternalStore, the React way to read something outside React.
 * The server answer is always "false", so server and browser agree during
 * hydration; React then corrects it right after if the browser disagrees.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}