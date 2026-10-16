import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { pageMetadata, resolvePage } from "./routing";
import "./styles/site.css";
import "./styles/pages.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root.");

const path = window.location.pathname;
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
document.title = pageMetadata(resolvePage(path)).title;
