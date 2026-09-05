import { useEffect, useState } from "react";
import logo from "@/assets/forge-logo.jpeg";
import collegeLogo from "@/assets/sree-rama-college-logo.webp";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1680px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10 lg:grid-cols-[auto_1fr_auto]">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Forge Mechanical Department Association logo"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 object-contain mix-blend-multiply dark:mix-blend-normal"
          />
          <span className="min-w-0 leading-none">
            <span className="block font-display text-sm font-bold tracking-tight uppercase">
              Forge
            </span>
            <span className="tech-label block text-[0.55rem]">Mech. Dept. Association</span>
          </span>
        </a>

        <nav className="hidden justify-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-steel transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-4">
          <a
            href="#contact"
            className="group hidden items-center gap-2 border border-foreground/20 px-5 py-3 font-mono text-[0.7rem] tracking-[0.16em] uppercase transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            Join Association
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <img
            src={collegeLogo}
            alt="Sree Rama Government Polytechnic College logo"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 object-contain"
          />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] border border-border lg:hidden"
          >
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[73px] z-40 bg-background lg:hidden">
          <nav className="flex h-full flex-col" aria-label="Mobile">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-border px-5 py-5"
              >
                <span className="font-display text-2xl font-bold uppercase tracking-tight">
                  {item.label}
                </span>
                <span className="tech-label">{String(i + 1).padStart(2, "0")}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-auto bg-accent px-5 py-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-accent-foreground"
            >
              Join Association &rarr;
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
