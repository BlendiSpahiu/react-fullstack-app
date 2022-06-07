const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/components/atoms/index'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules/index'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms/index'),
      '@templates': path.resolve(__dirname, 'src/components/templates/index'),
      '@contexts': path.resolve(__dirname, 'src/contexts/index'),
      '@enums': path.resolve(__dirname, 'src/enums/index'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index'),
      '@graphql': path.resolve(__dirname, 'src/graphql/'),
      '@intializers': path.resolve(__dirname, 'src/intializers/index'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces/index'),
      '@pages': path.resolve(__dirname, 'src/pages/index'),
      '@static': path.resolve(__dirname, 'src/static/index'),
      '@utils': path.resolve(__dirname, 'src/utils/index'),
      '@validators': path.resolve(__dirname, 'src/validators/index'),
    },
    style: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
};
