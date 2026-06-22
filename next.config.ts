import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", "tsx", "ts"],
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openaccess-api.clevelandart.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "openaccess-cdn.clevelandart.org",
        pathname: "/**",
      },
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(test|spec)\.(ts|tsx)$/,
      loader: "null-loader",
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
