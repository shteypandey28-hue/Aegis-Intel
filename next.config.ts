import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  outputFileTracingIncludes: {
    '/**': ['./prisma/dev.db'],
  },
};

export default nextConfig;
