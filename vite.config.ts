// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages static export mode.
// Enabled only when GITHUB_PAGES=true (set by .github/workflows/deploy.yml),
// so the Lovable-hosted build is completely unaffected.
const isGithubPages = process.env["GITHUB_PAGES"] === "true";

// GitHub Actions exposes GITHUB_REPOSITORY as "owner/repo".
// Project sites are served from https://<owner>.github.io/<repo>/, so the base
// path is derived from the repo name and stays correct if the repo is renamed.
// User/org sites (<owner>.github.io) are served from the root.
const repoName = (process.env["GITHUB_REPOSITORY"] ?? "").split("/")[1] ?? "";
const owner = (process.env["GITHUB_REPOSITORY"] ?? "").split("/")[0] ?? "";
const isUserSite = repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = isGithubPages && repoName && !isUserSite ? `/${repoName}/` : "/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGithubPages
      ? {
          // Prerender every route to static HTML so GitHub Pages can serve plain files.
          pages: [{ path: "/", prerender: { enabled: true } }],
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
            autoSubfolderIndex: true,
          },
        }
      : {}),
  },
  ...(isGithubPages
    ? {
        // No server runtime for a static export; prerendered HTML only.
        nitro: false as const,
        vite: { base: basePath },
      }
    : {}),
});
