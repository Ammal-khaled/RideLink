# RideLink

RideLink has three application surfaces backed by one authenticated API:

- **Customer:** Flutter application for Android and iOS (`mobile/`).
- **Shop admin:** React website, restricted to that administrator's store.
- **System admin:** React website for stores, shop accounts, reviews and global settings.

The root website runs the real account-based admin interface. It does not accept demo credentials. The API uses persistent SQLite storage, scrypt password hashes, revocable sessions, role checks, server-calculated prices and transactional booking approval.

## Run the service and admin website

Use Node.js 24 or later.

```sh
npm ci
npm run setup
npm run build
npm run server
```

The API and built website are served at `http://127.0.0.1:3001`. Set `APP_ORIGIN=http://127.0.0.1:3001` when using this combined server. For development, keep the API on port 3001 and use `npm run dev` to open the website on `http://127.0.0.1:5173`; that is the default allowed origin.

The first setup creates a system administrator. Its generated credentials are in `.local/admin-credentials.txt`, excluded from Git. Alternatively set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running setup. Setup never replaces an existing account. No fictional shops, customers, cars or reservations are seeded.

1. Sign in as system admin.
2. Add a store, then approve it.
3. Create a shop-admin account and assign it to that store. Use a password with at least 12 characters and share it securely.
4. Sign in as the shop admin and add real vehicle information and photographs.
5. Customers register in the mobile app and submit requests. The shop approves or rejects them.

## Run the customer app

Install Flutter stable (validated with 3.47.5) and the Android toolchain. A local SDK was installed in `.tools/flutter`; it is intentionally not committed.

```sh
cd mobile
flutter pub get
flutter run --dart-define=API_URL=http://10.0.2.2:3001
```

`10.0.2.2` reaches this computer from the Android emulator. On a physical Android phone connected over USB, use `adb reverse tcp:3001 tcp:3001` and build with `API_URL=http://127.0.0.1:3001`. A public installation requires a deployed HTTPS server; localhost is not a public backend.

```sh
flutter build apk --debug --dart-define=API_URL=http://10.0.2.2:3001
```

This creates a development APK, not an app-store release. Release builds require a real HTTPS `API_URL` and signing credentials. iOS requires macOS/Xcode and your Apple signing team. See [release instructions](docs/RELEASE.md).

## Validation

```sh
npm test
npm run test:api
npm run build
cd mobile
flutter analyze
flutter test
```

API tests use an isolated in-memory database. They exercise authentication, customer isolation, store-scoped access, server pricing, overlap rejection, moderation, suspension and session revocation. Flutter tests cover login validation and separate rental/deposit totals.

## Implemented behavior

- Customer registration/login, secure session storage, catalog search and filters, car details, date-range bookings, delivery address/ETA, separate deposit, request history/cancellation, review submission, password change and account deletion.
- Shop fleet CRUD with image uploads, booking approval/rejection/completion, and payment preference records.
- System store approval/suspension/deletion, real shop-admin account provisioning/suspension, review moderation, global delivery fees and announcements.
- English/Arabic interface and RTL layout. Customer-authored descriptions/reviews retain their original language.
- Booking requests do not reserve inventory until approved. Date ranges are end-exclusive. The API calculates every total; values supplied by a client cannot override prices.
- Deletion is blocked for active reservations. Customer account deletion removes reviews and anonymizes historical reservation contact fields.

## Deployment boundaries

This is an implemented application with a local backend, not a claim of app-store publication. Hosting, HTTPS/domain configuration, Android release keys and Apple signing must be supplied for deployment. Cash at pickup is implemented as a payment choice; receipt is not inferred from booking approval. eFAWATEERcom is not simulated or charged: live integration needs a merchant account and provider credentials. Automated email verification/recovery, push notifications and payment reconciliation are not connected.

SQLite is suitable for a single API instance with persistent disk. Do not put the database on ephemeral/serverless storage or run independent replicas against separate copies. Back up the database and verify restores before live operation. Car uploads are currently stored with the vehicle record with a 2 MB limit; a larger deployment should use object storage.

See [deployment](docs/DEPLOYMENT.md) for the container setup and [API](docs/API.md) for endpoint details.
