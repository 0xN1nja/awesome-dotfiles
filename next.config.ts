import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: __dirname,
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "react-icons/ai",
      "react-icons/bi",
      "react-icons/bs",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/fi",
      "react-icons/gr",
      "react-icons/md",
      "react-icons/si",
      "react-icons/tb",
      "lucide-react",
      "framer-motion",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
