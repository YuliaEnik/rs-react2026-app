import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],

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
    config.productionBrowserSourceMaps = false;
    config.module.rules.push({
      test: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
      loader: "ignore-loader", 
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
