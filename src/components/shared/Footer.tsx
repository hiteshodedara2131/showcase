import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background hairline-border-t py-12 sm:py-16 text-xs text-on-surface-variant font-sans">
      <div className="container-atelier">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-border-hairline">
          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Showcase 3D Web Studio Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight leading-none text-on-surface uppercase font-headline">
                  Showcase
                </span>
                <span className="text-[10px] tracking-widest text-on-surface-variant font-mono uppercase mt-0.5">
                  3D Web Studio
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-on-surface-variant">
              High-fidelity real-time 3D model viewing and PBR material customization directly in the browser. Powered by WebGL 2.0, Three.js, and calibrated physical studio lighting.
            </p>
            <div className="font-mono text-[11px] text-outline pt-1">
              WebGL 2.0 • ACES Filmic • Dielectric Optics • Client-Side 100MB
            </div>
          </div>

          {/* Col 1: 3D Tools */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-semibold block">
              3D Tools & Features
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/#stage" className="hover:text-primary transition-colors">
                  Live 3D Viewport Stage
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-primary transition-colors">
                  3D Studio Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/3d-model-viewer" className="hover:text-primary transition-colors">
                  GLB Model Viewer
                </Link>
              </li>
              <li>
                <Link href="/tools/shoe-3d-customizer" className="hover:text-primary transition-colors">
                  Sneaker Customizer
                </Link>
              </li>
              <li>
                <Link href="/tools/gltf-glb-editor" className="hover:text-primary transition-colors">
                  GLTF Material Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/4k-3d-product-snapshot" className="hover:text-primary transition-colors">
                  4K Snapshot Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions & Shaders */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-semibold block">
              Solutions & Shaders
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/ecommerce-3d-product-viewer" className="hover:text-primary transition-colors">
                  E-Commerce 3D Viewer
                </Link>
              </li>
              <li>
                <Link href="/tools/virtual-shoe-prototype" className="hover:text-primary transition-colors">
                  Virtual Footwear Prototyping
                </Link>
              </li>
              <li>
                <Link href="/tools/pbr-material-studio" className="hover:text-primary transition-colors">
                  PBR Material Studio
                </Link>
              </li>
              <li>
                <Link href="/tools/studio-lighting-simulator" className="hover:text-primary transition-colors">
                  Studio Lighting Simulator
                </Link>
              </li>
              <li>
                <Link href="/tools/webgl-product-embed" className="hover:text-primary transition-colors">
                  Embeddable WebGL Player
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Legal */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-semibold block">
              Resources & Legal
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Technical Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Engineering
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookie & Storage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px]">
          <span>© 2026 Showcase 3D Web Studio. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-outline">
            <span className="text-outline">Built by{" "}
              <a
                href="https://www.styloshare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors font-semibold underline-offset-2 hover:underline"
              >
                styloshare.com
              </a>
            </span>
            <Link href="/privacy" className="hover:text-on-surface transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-on-surface transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-on-surface transition-colors">
              Cookies
            </Link>
            <Link href="/contact" className="hover:text-on-surface transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
