import { useEffect, useState } from "react";

export function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (!enabled) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#main > section"));
    let frame: number | undefined;

    function update() {
      frame = undefined;
      const header = document.querySelector(".header")?.getBoundingClientRect().bottom ?? 0;
      let visibleHeight = 0;
      let current: string | undefined;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(innerHeight, rect.bottom) - Math.max(header, rect.top),
        );
        if (visible > visibleHeight) {
          visibleHeight = visible;
          current = section.id || undefined;
        }
      }
      setActive(current);
    }
    function schedule() {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return active;
}
