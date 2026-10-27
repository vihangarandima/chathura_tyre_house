/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { optimizePackageImports: ['@react-three/drei'] },
};
export default nextConfig;
