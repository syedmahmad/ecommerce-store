let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config.mjs');
} catch (e) {
  try {
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle local subdomain rewrites
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>store\\d+).localhost:3000',
            },
          ],
          destination: '/store/:subdomain*/:path*',
        },
        // Handle production subdomain rewrites
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>store\\d+).zylospace.com',
            },
          ],
          destination: '/store/:subdomain*/:path*',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-debug-host',
            value: ':host', // Will show the original host header
          },
        ],
      },
    ];
  },
};

if (userConfig) {
  const config = userConfig.default || userConfig;
  for (const key in config) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

export default nextConfig;