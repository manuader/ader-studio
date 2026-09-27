import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (≈30 % menos que WebP), WebP como respaldo.
    formats: ["image/avif", "image/webp"],
    // Las imágenes son estáticas: cachear el resultado optimizado un año.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:dir(images|videos|fonts)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
};

export default nextConfig;
