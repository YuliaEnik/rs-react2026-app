const nextConfig = {
  reactStrictMode: true,
  distDir: "./dist",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openaccess-api.clevelandart.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "openaccess-cdn.clevelandart.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
