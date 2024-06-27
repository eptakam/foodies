/* @type {import('next').NextConfig} */
const nextConfig = {
  // By default, Next.js doesn't allow the use of external URLs when using the <Image /> component. To allow this, you need to explicitly allow external URLs in the next.config.js file like bellow. Otherwise, there will be an error.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emmataks-nextjs-demo-users-image.s3.ca-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig