/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/ig',
        destination: '/?utm_source=instagram&utm_medium=social&utm_campaign=perfil&utm_content=bio',
        permanent: false,
      },
      {
        source: '/tt',
        destination: '/?utm_source=tiktok&utm_medium=social&utm_campaign=perfil&utm_content=bio',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
