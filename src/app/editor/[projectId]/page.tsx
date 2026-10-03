import type { Metadata } from "next";
import EditorStudioView from "@/views/editor/EditorStudioView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
  const { projectId } = await params;
  const formattedName = projectId
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formattedName} — 3D Product Studio Session`,
    description: `Real-time 3D studio session for ${formattedName}. Inspect high-resolution meshes, customize PBR surface textures, adjust environmental lighting, and generate cinematic exports.`,
    keywords: [
      `${formattedName} 3D`,
      "3D product editor",
      "WebGL configurator",
      "PBR material studio",
      "Three.js spatial editor",
    ],
    authors: [{ name: "Spatial Labs" }],
    creator: "Showcase Studio",
    publisher: "Showcase Kinetic Atelier",
    alternates: {
      canonical: `/editor/${projectId}`,
    },
    openGraph: {
      title: `${formattedName} — 3D Product Studio Session`,
      description: `Real-time 3D material inspection and lighting customizer for ${formattedName}.`,
      url: `/editor/${projectId}`,
      siteName: "Showcase 3D Web Studio",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${formattedName} 3D Studio Session`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedName} — 3D Product Studio Session`,
      description: `Real-time 3D material inspection and lighting customizer for ${formattedName}.`,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectEditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <EditorStudioView projectId={projectId} />;
}
