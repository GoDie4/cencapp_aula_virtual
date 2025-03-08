import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.cencapperu.com'], // Agrega 'localhost' a la lista
  },
};

export default nextConfig;
