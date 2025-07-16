// babel.config.js - Updated for SDK 50+
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          router: true, // Enable Expo Router support
        },
      ],
    ],
    plugins: [
      // Remove 'expo-router/babel' - it's now included in babel-preset-expo
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/stores': './src/stores',
            '@/services': './src/services',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/styles': './src/styles',
          },
        },
      ],
    ],
  }
}
