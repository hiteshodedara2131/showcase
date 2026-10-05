import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Variable fonts (Syne, Plus Jakarta Sans, JetBrains Mono) are loaded via
// `next/font/local` because `next/font/google` with multiple queries fails
// under Next.js 16 / Turbopack (the `NextFontGoogleFontFileReplacer` cannot
// resolve `@vercel/turbopack-next/internal/font/google/font` for a layout
// that imports more than one Google font). Self-hosting the woff2 files is
// also better for LCP and removes the build-time network dependency.
// The CSS variable names are unchanged so the rest of the codebase
// (Tailwind tokens in `src/app/globals.css`, `font-sans`/`font-mono`/etc.)
// keeps working without any further changes.

const syne = localFont({
  src: "../../public/fonts/syne.latin.woff2",
  variable: "--font-syne",
  display: "swap",
  weight: "500 800",
  style: "normal",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const plusJakartaSans = localFont({
  src: "../../public/fonts/plus-jakarta.latin.woff2",
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: "400 700",
  style: "normal",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: "../../public/fonts/jetbrains-mono.latin.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "400 600",
  style: "normal",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://showcase-3d.com"
  ),
  title: {
    default: "Showcase — 3D Web Studio & Kinetic Atelier",
    template: "%s | Showcase 3D Web Studio",
  },
  description:
    "High-fidelity real-time 3D product showcase and browser-based spatial studio. Bring your product. Make it impossible to overlook.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Showcase — 3D Web Studio & Kinetic Atelier",
    description:
      "High-fidelity real-time 3D product showcase and virtual spatial studio.",
    siteName: "Showcase",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Showcase 3D Web Studio Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
