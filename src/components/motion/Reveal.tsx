"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Optional stagger delay in ms, for revealing a row of items one after another. */
  delay?: number;
  className?: string;
  /** Element tag to render — defaults to a plain div so it doesn't affect layout semantics. */
  as?: "div" | "section" | "li";
};

/**
 * Fades + slides content up into place the first time it scrolls into view.
 * CSS-only transition driven by a single class toggle (no animation
 * library needed — keeps the project dependency-free, per the constraint
 * that installs happen on the user's own machine with a possibly-limited
 * setup). Respects prefers-reduced-motion by doing nothing (content is
 * visible immediately either way — this only ever animates FROM visible
 * content, never hides content if JS fails).
 */
export default function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: show immediately, no observer needed.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
