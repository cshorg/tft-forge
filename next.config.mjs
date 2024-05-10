/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.communitydragon.org'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
