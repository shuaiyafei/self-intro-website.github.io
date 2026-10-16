import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { loadNotes } from "./scripts/content.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const notesDirectory = path.join(root, "src/content/notes");
const virtualId = "\0virtual:notes";

function notesPlugin(): Plugin {
  return {
    name: "personal-site-notes",
    resolveId(id) {
      if (id === "virtual:notes") return virtualId;
    },
    async load(id) {
      if (id !== virtualId) return;
      return `export default ${JSON.stringify(await loadNotes(notesDirectory))};`;
    },
    configureServer(server) {
      server.watcher.add(notesDirectory);
      const refresh = (filename: string) => {
        if (!filename.startsWith(`${notesDirectory}${path.sep}`) || !filename.endsWith(".md"))
          return;
        const module = server.moduleGraph.getModuleById(virtualId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh).on("change", refresh).on("unlink", refresh);
    },
  };
}

export default defineConfig({
  plugins: [react(), notesPlugin()],
  base: "/",
  build: { outDir: "dist", emptyOutDir: true },
  server: { fs: { allow: [root] } },
});
