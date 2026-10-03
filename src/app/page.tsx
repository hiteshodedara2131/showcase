import type { Metadata } from "next";
import HomeView from "@/views/home";

export const metadata: Metadata = {
  title: "Showcase — 3D Web Studio & Product Gallery",
  description:
    "Explore interactive 3D product showcases, or place your own 3D model in a ready-made scene to create studio images and web previews. Bring your product. Make it impossible to overlook.",
  openGraph: {
    title: "Showcase — 3D Web Studio & Product Gallery",
    description:
      "Explore interactive 3D product showcases or stage your model in a ready-made scene.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function HomePage() {
  return <HomeView />;
}
