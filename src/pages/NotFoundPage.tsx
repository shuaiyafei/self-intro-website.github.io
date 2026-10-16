import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";

export function NotFoundPage() {
  return (
    <div className="not-found shell">
      <div className="not-found-content">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>
          This path doesn't compile<span className="accent">.</span>
        </h1>
        <p>The page you're looking for may have moved or no longer exists.</p>
        <a className="button" href="/">
          <ArrowLeft className="icon" aria-hidden="true" />
          Return home
        </a>
      </div>
      <Footer />
    </div>
  );
}
