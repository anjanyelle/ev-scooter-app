# Production handoff

- Application ID: `com.lexicon.mobility`
- Version name: `1.1.0`
- Version code: `2`
- Minimum Android API: `26`
- Target and compile API: `36`
- JavaScript engine: Hermes
- New Architecture: enabled
- Release minification and resource shrinking: enabled

Before publishing, configure a private release keystore outside source control, set the official HTTPS API endpoint and support links, add the Google Maps key, run `npm run validate`, then build and test the signed AAB on physical devices.
