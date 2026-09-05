import logo from "@/assets/forge-logo.jpeg";

const LINKS = ["About", "Events", "Projects", "Team", "Gallery", "Contact"];
const SOCIAL = ["Instagram", "LinkedIn", "YouTube", "Email"];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Forge Mechanical Department Association logo"
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 object-contain mix-blend-multiply dark:mix-blend-normal"
              />
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-tight">Forge</p>
                <p className="tech-label">Place where strength &amp; creativity are built</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm text-steel">
              Mechanical Engineering Association — Department of Mechanical Engineering.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="tech-label">Navigate</p>
            <ul className="mt-5 space-y-2">
              {LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="tech-label">Connect</p>
            <ul className="mt-5 space-y-2">
              {SOCIAL.map((l) => (
                <li key={l}>
                  <a href="#contact" className="text-sm transition-colors hover:text-accent">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="tech-label">Mechanical Engineering Association</p>
          <p className="tech-label">Engineering • Design • Innovation</p>
          <p className="tech-label">© 2026 — MEA / FORGE</p>
        </div>
      </div>
    </footer>
  );
}
