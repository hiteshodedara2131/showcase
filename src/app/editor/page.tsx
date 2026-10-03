import type { Metadata } from "next";
import EditorStudioView from "@/views/editor/EditorStudioView";

export const metadata: Metadata = {
  title: "3D Product Studio — Interactive WebGL Spatial Customizer",
  description:
    "Explore the real-time 3D spatial studio. Customize footwear geometries, tune PBR materials (TPU waffle soles, mesh, leather, rubber), configure studio lighting rigs, and export high-resolution renders.",
  keywords: [
    "3D product editor",
    "3D shoe customizer",
    "WebGL 3D studio",
    "Three.js footwear customizer",
    "PBR material editor",
    "real-time 3D rendering",
    "spatial studio",
    "kinetic product design",
    "interactive 3D configurator",
    "React Three Fiber studio",
  ],
  authors: [{ name: "Spatial Labs" }],
  creator: "Showcase Studio",
  publisher: "Showcase Kinetic Atelier",
  alternates: {
    canonical: "/editor",
  },
  openGraph: {
    title: "3D Product Studio — Interactive WebGL Spatial Customizer",
    description:
      "Inspect footwear geometry, tune PBR materials in real-time, adjust studio lighting, and export high-resolution renders.",
    url: "/editor",
    siteName: "Showcase 3D Web Studio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "3D Product Editor Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Product Studio — Interactive WebGL Customizer",
    description:
      "Interactive real-time 3D product customizer. Tune materials, studio lighting rigs, and export renders.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EditorPage() {
  return <EditorStudioView projectId="runner-v2" />;
}
