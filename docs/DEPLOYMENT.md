# Deployment

The repository includes a multi-stage Dockerfile. Build it on your chosen server with a persistent disk. Docker was not available in the development environment, so the container has not been executed here.

```sh
docker build -t ridelink .
docker volume create ridelink-data
docker volume create ridelink-private
# Supply a real private ADMIN_EMAIL and ADMIN_PASSWORD through your secret manager.
docker run --rm --env-file bootstrap.env -v ridelink-data:/app/.runtime -v ridelink-private:/app/.local ridelink node server/setup.mjs
docker run -d --name ridelink --restart unless-stopped --env-file production.env -p 127.0.0.1:3001:3001 -v ridelink-data:/app/.runtime -v ridelink-private:/app/.local ridelink
```

`production.env` must contain:

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=3001
APP_ORIGIN=https://your-real-domain
DATABASE_PATH=/app/.runtime/ridelink.sqlite
```

Put an HTTPS reverse proxy in front of port 3001. Use the same origin for the website and API. Do not expose the database or `.local` directory. Set the mobile `API_URL` to the same HTTPS origin. Secure cookies are enabled when NODE_ENV is production.

The rate limiter currently uses the connection IP, deliberately ignoring untrusted forwarded headers. Behind a reverse proxy this can group clients under one address; configure a trusted edge rate limiter before a public rollout and adapt proxy trust only to known proxy infrastructure.

Back up SQLite using SQLite's online backup facility or stop the service before copying the database. A WAL database can have uncheckpointed data, so do not copy only its main file while the service is writing. Retain encrypted backups outside the server and test a restore.

Credentials, tokens, `.env` files, databases, mobile signing material and private setup files are excluded from Git and the container context.

The operator must supply real vehicle content, rental/deposit terms, privacy policy, support contact and applicable business requirements before a public launch. Release readiness has not been represented as legal or regulatory certification.
