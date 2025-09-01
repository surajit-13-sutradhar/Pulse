import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Exclude problematic Windows directories from file watching
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/Application Data/**',
        '**/Application Data',
        'C:/Users/*/Application Data/**',
        'C:\\Users\\*\\Application Data\\**',
        '**/AppData/**',
        '**/Documents and Settings/**',
        '**/Program Files/**',
        '**/Program Files (x86)/**',
        '**/Windows/**',
        '**/System32/**'
      ],
      // Add polling for Windows to avoid permission issues
      poll: 1000,
      aggregateTimeout: 300
    };

    // Additional configuration to prevent webpack from scanning system directories
    config.resolve = config.resolve || {};
    config.resolve.symlinks = false;
    
    // Prevent webpack from accessing restricted directories
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/])(?!(@types[\\/]node[\\/]|@types[\\/]react[\\/]))/,
      ],
      immutablePaths: [
        /^(.+?[\\/]node_modules[\\/])(?!(@types[\\/]node[\\/]|@types[\\/]react[\\/]))/,
      ],
    };

    // Improve module resolution for Windows
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
  // Disable problematic experimental features that might cause issues
  experimental: {
    serverComponentsExternalPackages: [],
    // Disable turbo for build to avoid permission issues
    turbo: {
      rules: {},
    },
  },
};

export default nextConfig;
