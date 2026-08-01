# LEXICON EV Companion — Native Android

A React Native Community CLI Android application for the LEXICON electric vehicle companion experience. The existing screens, visual hierarchy, motion, vehicle viewer, navigation flow, mock data, authentication flow, maps, web content and preferences are retained inside a native Android project.

## Requirements

- Node.js 22.13 or newer
- npm 10 or newer
- JDK 17
- Android Studio with Android SDK 36 and NDK 27.1.12297006

## Run

```bash
cp .env.example .env
npm install
npm run android
```

Start Metro separately when needed:

```bash
npm start
```

## Build Android artifacts

```bash
npm run android:apk
npm run android:aab
```

Release builds intentionally have no bundled signing key. Add your production signing configuration before publishing. Debug builds use `android/app/debug.keystore`.

## Configuration

Edit `.env`, then run `npm run configure`. Android builds run the same generator automatically. Production API endpoints must use HTTPS. Local cleartext traffic is allowed only for `localhost`, `127.0.0.1`, or `10.0.2.2` in non-production builds.

See `docs/ANDROID_STUDIO_SETUP.md`, `docs/BACKEND_CONTRACT.md`, and `docs/QA_CHECKLIST.md` for handoff details.
