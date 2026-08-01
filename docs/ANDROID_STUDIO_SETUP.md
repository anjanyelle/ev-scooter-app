# Android Studio setup

1. Install JDK 17 and Android Studio.
2. Install Android SDK Platform 36, Build Tools 36.0.0, and NDK 27.1.12297006.
3. Copy `.env.example` to `.env` and set required values.
4. Run `npm install` in the project root.
5. Open the `android` directory in Android Studio.
6. Allow Gradle sync to finish, select a device, and run the `app` configuration.

The included launchers download Gradle 9.3.1 on first use and verify the official SHA-256 checksum before extracting it. Android Studio may also use its configured Gradle installation.

For terminal development, run `npm start` in one terminal and `npm run android` in another.
