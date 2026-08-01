# QA checklist

- Fresh launch shows the branded native splash and in-app launch animation.
- Mock login accepts the documented preview flow and restores the session after restart.
- Sign-up and OTP routes preserve back/replace behavior.
- Home, Rides, Charging, Service, and Profile tabs render with the same dark glass UI.
- Center charging action remains elevated and aligned across phone sizes.
- Vehicle viewer gestures, lighting toggle, reset action, and hotspots work smoothly.
- Lock commands require device biometric or screen-lock authorization.
- Notification permission and all three Android channels are configured.
- Live tracking map loads when a valid Maps key is supplied.
- About web content and external links handle missing configuration safely.
- Logout clears encrypted session data and returns to Login.
- Release APK/AAB runs with Hermes and minification enabled.
