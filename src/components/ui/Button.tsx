"use client";

import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "hud";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  showBlueprintGrid?: boolean;
}

/**
 * Custom architectural model/node icon matching the design brief reference
 */
export const ModelNodeIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={`shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 ${className}`}
  >
    {/* Left Root Node */}
    <rect x="2" y="6" width="3.5" height="3.5" rx="0.5" fill="currentColor" fillOpacity="0.2" />
    {/* Upper Right Branch Node */}
    <rect x="10.5" y="2" width="3.5" height="3.5" rx="0.5" fill="currentColor" fillOpacity="0.2" />
    {/* Lower Right Branch Node */}
    <rect x="10.5" y="10.5" width="3.5" height="3.5" rx="0.5" fill="currentColor" fillOpacity="0.2" />
    {/* Connecting Circuit / Branch Lines */}
    <path
      d="M5.5 7.75H8V3.75H10.5 M8 7.75V12.25H10.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  iconRight,
  showBlueprintGrid,
  className = "",
  ...props
}) => {
  const isPrimary = variant === "primary";
  const hasGrid = showBlueprintGrid !== undefined ? showBlueprintGrid : isPrimary;

  const baseClasses =
    "group relative inline-flex items-center justify-center font-mono font-medium overflow-hidden transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-[3px] max-w-full";

  const sizeClasses = {
    sm: "text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 gap-1.5 sm:gap-2 tracking-wide",
    md: "text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 gap-2 sm:gap-2.5 tracking-wider",
    lg: "text-xs sm:text-sm md:text-base px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 gap-2 sm:gap-3 tracking-wider",
  }[size];

  const variantClasses = {
    // Primary: The exact Safety Terracotta Blueprint button from the reference image
    primary:
      "bg-[#a9310f] hover:bg-[#cb4926] text-white border border-[#cb4926]/60 hover:border-white/50 shadow-md hover:shadow-lg hover:shadow-[#a9310f]/25",
    // Secondary: Milled Carbon Obsidian with subtle blueprint lines
    secondary:
      "bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/60 hover:border-outline shadow-sm",
    // Outline: Minimal architectural hairline button
    outline:
      "bg-transparent hover:bg-surface-container text-on-surface border border-outline-variant/60 hover:border-outline",
    // HUD: Frosted glass floating tool button
    hud: "bg-surface-container/80 backdrop-blur-md hover:bg-surface-container-high text-on-surface border border-outline-variant/40 hover:border-primary/50 shadow-sm",
  }[variant];

  const content = (
    <>
      {/* Blueprint Coordinate Grid Overlay */}
      {hasGrid && (
        <span
          className="absolute inset-0 pointer-events-none btn-blueprint-grid opacity-35 group-hover:opacity-60 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Subtle light sweep reflection on hover */}
      <span
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        aria-hidden="true"
      />

      {/* Button Content */}
      <span className="relative z-10 inline-flex items-center gap-2 max-w-full min-w-0">
        {icon !== undefined ? icon : isPrimary ? <ModelNodeIcon /> : null}
        <span className="truncate sm:whitespace-nowrap font-mono">{children}</span>
        {iconRight && (
          <span className="transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">
            {iconRight}
          </span>
        )}
      </span>
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
