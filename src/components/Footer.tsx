import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

export function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer className="footer">
      <a className="footer-name" href={home ? "#top" : "/"}>
        {profile.name}
        <span className="accent">.</span>
      </a>
      <span>Thoughtfully built. Always evolving.</span>
      <span>© {profile.year}</span>
      <a href="#top">
        Back to top <ArrowUpRight className="icon" aria-hidden="true" />
      </a>
    </footer>
  );
}
