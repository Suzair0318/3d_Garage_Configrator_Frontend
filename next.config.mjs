/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static HTML into the 'out' folder on build
  output: 'export',
  // Keep images unoptimized since you're using <img> in places
  images: {
    unoptimized: true,
  },
  // Optional: ensures consistent relative paths for static export
  trailingSlash: true,
};

export default nextConfig;
