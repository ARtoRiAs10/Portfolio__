import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: {
    absolute: "GitHub Profile — Gaurav Kumar",
  },
  description:
    "Gaurav Kumar — full-stack and AI engineer. Pinned builds, selected advanced projects, stack, and contact details.",
  alternates: {
    canonical: "/profile",
  },
  openGraph: {
    title: "Gaurav Kumar — GitHub Profile",
    description:
      "Pinned builds and selected advanced projects from full-stack and AI engineer Gaurav Kumar.",
    url: "/profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Kumar — GitHub Profile",
    description:
      "Pinned builds and selected advanced projects from full-stack and AI engineer Gaurav Kumar.",
  },
};

export default function ProfileRoute() {
  return <ProfilePage />;
}