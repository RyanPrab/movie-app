module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
}
