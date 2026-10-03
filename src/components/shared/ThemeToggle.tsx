"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = localStorage.getItem("showcase-theme");
    const initialDark = stored
      ? stored === "dark"
      : root.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDark(initialDark);
    if (initialDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      root.classList.add("dark");
      localStorage.setItem("showcase-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("showcase-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-sm hairline-border bg-surface-container ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={isDark ? "Switch to gallery light mode" : "Switch to obsidian dark mode"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-sm hairline-border bg-surface text-foreground hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-on-surface-variant hover:text-secondary transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-on-surface-variant hover:text-primary transition-colors" />
      )}
    </button>
  );
};
