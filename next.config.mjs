import path from 'path';

const nextConfig = {
  output: 'export',
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },
};

export default nextConfig;
