# RideLink

RideLink is a car-rental platform with a Flutter Android customer app, a shop-admin website, a system-admin website, and a shared authenticated API. The original Figma-generated interface remains in [`app/`](app/); the runnable production-oriented implementation is in the workspace root and [`mobile/`](mobile/).

## Run the admin websites and API

Use Node.js 24 or later:

```sh
npm ci
npm run setup
npm run build
npm run server
```

The API serves the built websites at `http://127.0.0.1:3001`. For development, run `npm run dev` in another terminal; the Vite website is at `http://127.0.0.1:5173` and connects to the API on port 3001.

The first setup creates a system administrator. Its generated credentials are saved locally in `.local/admin-credentials.txt`, which is excluded from Git. On server startup, an empty database is automatically populated with UAE demo stores, cars, shop admins, customers, bookings, and reviews. Generated shop-admin emails and passwords are printed to the server console. To disable demo seeding for a real production launch, set `NODE_ENV=production` and `DISABLE_DEMO_SEED=1` before starting the server. Sign in as the system admin to manage stores and accounts.

## Run the Android app

Install Flutter stable and the Android toolchain, then:

```sh
cd mobile
flutter pub get
flutter run --dart-define=API_URL=http://10.0.2.2:3001
```

`10.0.2.2` reaches the API on this computer from an Android emulator. A connected phone can use `adb reverse tcp:3001 tcp:3001` and `API_URL=http://127.0.0.1:3001`. A public installation requires a deployed HTTPS API.

## Checks

```sh
npm test
npm run test:api
npm run build
cd mobile
flutter analyze
flutter test
```

The API enforces role/store access, hashes passwords and sessions, calculates booking prices on the server, and handles booking approval transactionally. Payment choice and approval do not claim that a payment was received. Live payment processing, hosting, HTTPS, and release signing need deployment configuration and provider credentials; see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) and [`docs/RELEASE.md`](docs/RELEASE.md).
