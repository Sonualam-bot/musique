/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img-musesai.163264.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
