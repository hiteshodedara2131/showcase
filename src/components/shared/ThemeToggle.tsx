"use client";

import React, { useSyncExternalStore, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "showcase-theme";

/**
 * useSyncExternalStore is the React 19-approved way to read browser-only
 * state (localStorage / matchMedia) on first render without an effect —
 * it avoids the "setState in effect" anti-pattern and the hydration
 * cascade that the legacy `useState + useEffect(setMounted)` pair caused.
 */
function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): boolean {
  return true; // Default to dark on the server
}

function getClientSnapshot(): boolean {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return stored === "dark";
  if (document.documentElement.classList.contains("dark")) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const isDark = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const nextDark = !isDark;
    if (nextDark) {
      root.classList.add("dark");
      window.localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem(STORAGE_KEY, "light");
    }
    // Notify any other tabs / listeners
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, [isDark]);

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
