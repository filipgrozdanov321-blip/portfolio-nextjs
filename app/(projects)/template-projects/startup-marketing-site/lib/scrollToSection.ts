import type { useRouter } from "next/navigation";

type AppRouter = ReturnType<typeof useRouter>;

// This project is mounted at /template-projects/startup-marketing-site inside
// the portfolio. Update this in one place if the folder ever moves.
export const STARTUP_HOME_PATH = "/template-projects/startup-marketing-site";
export const STARTUP_STORY_PATH = `${STARTUP_HOME_PATH}/story`;

/**
 * Scrolls to a section id if already on the Rivet homepage.
 * Otherwise navigates to the Rivet homepage with a hash.
 */
export function scrollToSection(id: string, pathname: string, router: AppRouter) {
  if (pathname === STARTUP_HOME_PATH) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    router.push(`${STARTUP_HOME_PATH}#${id}`);
  }
}

/**
 * Call this in a useEffect on the Rivet homepage to finish the scroll
 * after navigating in from another route with a #hash.
 */
export function scrollToHashOnLoad() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  });
}