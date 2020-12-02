module.exports = {
  async rewrites() {
    return [
      {
        source: "/posts",
        destination: "/posts/page/1",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/posts/page",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
};
