import type { Metadata } from "next";
import EditorStudioView from "@/views/editor/EditorStudioView";

export const metadata: Metadata = {
  title: "New 3D Project Workspace — Spatial Studio",
  description:
    "Launch a blank 3D product staging scene. Stage custom GLB/GLTF models, configure physical lighting rigs, and customize PBR materials in real-time.",
  keywords: [
    "new 3D project",
    "GLB model viewer",
    "GLTF 3D staging",
    "PBR material studio",
    "real-time 3D web editor",
    "3D workspace",
  ],
  authors: [{ name: "Spatial Labs" }],
  creator: "Showcase Studio",
  publisher: "Showcase Kinetic Atelier",
  alternates: {
    canonical: "/editor/new",
  },
  openGraph: {
    title: "New 3D Project Workspace — Spatial Studio",
    description:
      "Stage your custom GLB/GLTF models in a ready-made architectural studio scene with real-time PBR material controls.",
    url: "/editor/new",
    siteName: "Showcase 3D Web Studio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "New 3D Project Staging Scene",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New 3D Project Workspace — 3D Studio",
    description:
      "Stage custom GLB models with real-time PBR controls and studio lighting rigs.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewEditorProjectPage() {
  return <EditorStudioView projectId="new" />;
}
