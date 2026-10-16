import { useEffect } from "react";

export function useSectionPaging() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 961px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#main > section"));
    let accumulated = 0;
    let lastWheelAt = 0;
    let locked = false;
    let transitionDirection = 0;
    let transitionOrigin = 0;
    let transitionTarget = 0;
    let frame = 0;

    function reset() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      locked = false;
      accumulated = 0;
      lastWheelAt = 0;
      transitionDirection = 0;
    }

    function transition(target: number, origin: number, direction: number) {
      locked = true;
      transitionDirection = direction;
      transitionOrigin = origin;
      transitionTarget = target;
      const started = performance.now();
      let settled = 0;
      window.scrollTo({ top: target, behavior: reducedMotion.matches ? "instant" : "smooth" });

      // Release when the transition ends, even if wheel input continues.
      function finish() {
        settled = Math.abs(window.scrollY - target) < 2 ? settled + 1 : 0;
        if (settled >= 3 || performance.now() - started > 3000) {
          reset();
        } else {
          frame = window.requestAnimationFrame(finish);
        }
      }
      frame = window.requestAnimationFrame(finish);
    }

    function onWheel(event: WheelEvent) {
      if (
        !desktop.matches ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
      ) {
        return;
      }
      const direction = Math.sign(event.deltaY);
      let element = event.target instanceof Element ? event.target : null;
      while (element && element !== document.body) {
        if (element.matches("textarea, select, [contenteditable='true']")) return;
        const style = getComputedStyle(element);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          element.scrollHeight > element.clientHeight &&
          (direction > 0
            ? element.scrollTop + element.clientHeight < element.scrollHeight - 1
            : element.scrollTop > 1)
        ) {
          return;
        }
        element = element.parentElement;
      }

      const now = performance.now();
      if (locked) {
        event.preventDefault();
        if (direction !== transitionDirection) {
          const target = transitionOrigin;
          const origin = transitionTarget;
          reset();
          transition(target, origin, direction);
        }
        return;
      }
      const headerHeight = document.querySelector(".header")?.getBoundingClientRect().height ?? 0;
      const viewportHeight = window.innerHeight - headerHeight;
      const starts = sections.map(
        (section) => section.getBoundingClientRect().top + window.scrollY - headerHeight,
      );
      let current = 0;
      for (let index = 0; index < starts.length; index++) {
        if (starts[index] <= window.scrollY + 2) current = index;
      }
      const end = starts[current] + Math.max(0, sections[current].offsetHeight - viewportHeight);

      // Keep native scrolling inside a section that grows beyond the viewport.
      if (
        (direction > 0 && window.scrollY < end - 2) ||
        (direction < 0 && window.scrollY > starts[current] + 2)
      ) {
        accumulated = 0;
        lastWheelAt = now;
        return;
      }

      event.preventDefault();
      if (now - lastWheelAt > 180 || Math.sign(accumulated) !== direction) accumulated = 0;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportHeight : 1;
      accumulated += event.deltaY * unit;
      lastWheelAt = now;
      if (Math.abs(accumulated) < 40) return;

      const next = Math.max(0, Math.min(sections.length - 1, current + direction));
      accumulated = 0;
      if (next === current) return;
      const target = Math.max(
        0,
        Math.min(starts[next], document.documentElement.scrollHeight - window.innerHeight),
      );
      transition(target, window.scrollY, direction);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("resize", reset);
    desktop.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("resize", reset);
      desktop.removeEventListener("change", reset);
    };
  }, []);
}
