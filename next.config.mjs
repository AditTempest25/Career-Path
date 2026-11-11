/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/auth/login", destination: "/login", permanent: false },
      { source: "/auth/register", destination: "/register", permanent: false },
      { source: "/auth/forgot-password", destination: "/login", permanent: false },
      { source: "/dashboard/career-gps", destination: "/careers", permanent: false },
      { source: "/dashboard/roadmap", destination: "/roadmap", permanent: false },
      { source: "/dashboard/simulator", destination: "/simulator", permanent: false },
      { source: "/dashboard/portfolio", destination: "/portfolio", permanent: false },
      { source: "/dashboard/profile", destination: "/settings", permanent: false },
      { source: "/dashboard/settings", destination: "/settings", permanent: false },
    ];
  },
};

export default nextConfig;
