/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      // https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png
      // TS logo
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // port: '',
        pathname: '/**',
      },
      // 'https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png'
      // Next logo
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
        // port: '',
        pathname: '/**',
      },
      // https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png
      // Tailwind logo
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // port: '',
        pathname: '/**',
      },
      // https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-goog/events/firebase_xwsV0rV.png
      // Firebase  logo
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // port: '',
        pathname: '/**',
      },
      // https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png
      // React logo
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // port: '',
        pathname: '/**',
      },
      // https://supereasy.club/wp-content/uploads/2022/04/orig.png
      // Vercel logo
      {
        protocol: 'https',
        hostname: 'supereasy.club',
        // port: '',
        pathname: '/**',
      },
      // https://avatars.githubusercontent.com/u/64233636?v=4
      // Github Avatar
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        // port: '',
        pathname: '/**',
      },
      // https://cdn.pixabay.com/photo/2018/03/14/13/21/statue-3225208_960_720.png
      // 404 Image
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        // port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
