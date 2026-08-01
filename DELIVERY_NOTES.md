# Delivery notes

This package is an Android-first native React Native project. Open the `android` directory directly in Android Studio after installing JavaScript dependencies.

The UI source remains under `app/` and shared logic remains under `src/`. Navigation composition is under `src/navigation/`. Environment values are generated into `src/config/generatedRuntime.ts` and native Android configuration reads the same `.env` file.

Typography retains the original sizes, weights, spacing, and hierarchy while using Android system sans-serif families; no external font binary is bundled.

No production signing secret, backend credential, Maps key, store URL, or roadside phone number is embedded. Supply approved values during deployment.
