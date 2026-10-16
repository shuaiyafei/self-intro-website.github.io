import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";

export function Header({ home = false, section }: { home?: boolean; section?: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const prefix = home ? "" : "/";
  const visibleSection = useActiveSection(home);
  const activeSection = home ? visibleSection : section;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus({ preventScroll: true });
      }
    }
    function onPointer(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setOpen(false);
    }
    const breakpoint = window.matchMedia("(min-width: 601px)");
    const onBreakpoint = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    breakpoint.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      breakpoint.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header
      className={`header${open ? " menu-expanded" : ""}`}
      ref={headerRef}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setOpen(false);
        }
      }}
    >
      <div className="shell header-inner">
        <a className="brand" href={home ? "#top" : "/"} aria-label={`${profile.name}, home`}>
          <span className="brand-mark">YF</span>
          <span>{profile.name}</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-controls="navigation"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          ref={buttonRef}
        >
          {open ? (
            <X className="icon" aria-hidden="true" />
          ) : (
            <Menu className="icon" aria-hidden="true" />
          )}
        </button>
        <nav
          className="nav"
          id="navigation"
          aria-label="Main navigation"
          onClick={() => setOpen(false)}
        >
          <a
            href={`${prefix}#about`}
            aria-current={activeSection === "about" ? "location" : undefined}
          >
            About
          </a>
          <a
            href={`${prefix}#work`}
            aria-current={activeSection === "work" ? "location" : undefined}
          >
            Work
          </a>
          <a
            href={home ? "#notes" : "/notes/"}
            aria-current={activeSection === "notes" ? "location" : undefined}
          >
            Notes
          </a>
          <a
            className="nav-contact"
            href={`${prefix}#contact`}
            aria-current={activeSection === "contact" ? "location" : undefined}
          >
            Let's talk <ArrowUpRight className="icon" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
