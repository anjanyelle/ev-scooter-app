module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: { '@': './src' },
        extensions: ['.android.js', '.android.ts', '.android.tsx', '.js', '.ts', '.tsx', '.json']
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
