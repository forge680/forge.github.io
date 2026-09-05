import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Component>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="tech-label text-accent">{index}</span>
      <span className="h-px w-8 bg-accent" aria-hidden />
      <span className="tech-label">{children}</span>
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "ghost",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300";
  const styles = {
    solid: "bg-accent text-accent-foreground px-6 py-4 hover:bg-foreground",
    outline:
      "border border-foreground/25 px-6 py-4 text-foreground hover:border-accent hover:text-accent",
    ghost: "text-foreground hover:text-accent",
  }[variant];

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
        &rarr;
      </span>
    </a>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry || !entry.isIntersecting) return;
      io.disconnect();
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
