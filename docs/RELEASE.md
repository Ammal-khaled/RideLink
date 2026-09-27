# Mobile releases

## Android

1. Deploy the API and admin website to a working HTTPS domain.
2. Choose and verify your final unique application ID; the generated ID is `com.ridelink.ridelink`.
3. Generate and securely retain your upload keystore. Do not commit it.
4. Copy `mobile/android/key.properties.example` to `mobile/android/key.properties` and enter your keystore path and credentials.
5. Run `flutter build appbundle --release --dart-define=API_URL=https://your-real-domain` from `mobile/`.
6. Test the signed build on real devices before submitting it to Google Play.

A debug APK uses the development signing key and the provided API URL. It is not a store-ready signed release. Debug HTTP access is enabled for local development only; release API calls enforce HTTPS.

## iPhone

The Flutter iOS source is generated, but cannot be compiled on Windows.

1. Open the project on a Mac with Xcode and the same Flutter version.
2. Run `flutter pub get`.
3. Open `mobile/ios/Runner.xcworkspace` in Xcode, choose your Apple Developer team and final bundle ID.
4. Keep the Keychain entitlement aligned with the final bundle ID. It is configured for secure session storage.
5. Run `flutter build ipa --release --dart-define=API_URL=https://your-real-domain`.
6. Test on real iPhones, complete signing/export, and distribute with TestFlight or the App Store.

The current repository does not include your distribution certificates, provisioning profiles or store accounts. No IPA or App Store submission has been produced on Windows.

The Android and iOS platform folders are native Flutter runner projects. The React admin website is not embedded in the customer app.
