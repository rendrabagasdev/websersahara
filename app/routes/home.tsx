import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sersahara Official | Merchandise & Komunitas" },
    {
      name: "description",
      content:
        "Sersahara official menyediakan merchandise original, katalog produk, dan informasi komunitas Sersahara.",
    },
    {
      name: "keywords",
      content:
        "sersahara, sersahara official, merchandise sersahara, katalog sersahara, komunitas sersahara",
    },
    { property: "og:title", content: "Sersahara Official" },
    {
      property: "og:description",
      content:
        "Temukan merchandise original dan katalog produk dari Sersahara official.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Sersahara Official" },
    {
      name: "twitter:description",
      content: "Katalog merchandise dan informasi komunitas Sersahara.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
