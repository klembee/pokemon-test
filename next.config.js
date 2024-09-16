/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/PokeAPI/sprites/master/sprites/**'
        }]
      },
};

export default config;
