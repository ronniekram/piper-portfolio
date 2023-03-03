/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`cdn.sanity.io`],
  },
  // USING TO PREVENT BUILD ERROR CAUSED BY SANITY V3 -- RUN TYPECHECK PRE-COMMIT WITH `yarn ts-lint`
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
