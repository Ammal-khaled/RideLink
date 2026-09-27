# API

All mutation bodies are JSON. Responses are JSON; failures use `{ "error": "..." }` and an appropriate HTTP status. Browser sessions use HttpOnly SameSite cookies. Native apps use the returned token in `Authorization: Bearer TOKEN` and store it in platform secure storage.

| Endpoint | Method | Access |
|---|---|---|
| `/api/auth/register` | POST | Public; creates customer only |
| `/api/auth/login` | POST | Public; valid password required |
| `/api/auth/me` | GET | Signed in |
| `/api/auth/logout` | POST | Signed in |
| `/api/auth/password` | PUT | Signed in + current password |
| `/api/auth/account` | DELETE | Customer + password; no active bookings |
| `/api/catalog` | GET | Public; active stores, available cars, published reviews |
| `/api/bookings` | GET | Own customer records or assigned shop records; system sees all |
| `/api/bookings` | POST | Customer; prices calculated on server |
| `/api/bookings/:id` | PATCH | Owner cancellation or authorized admin transition |
| `/api/reviews` | POST | Customer with completed rental; one review per rental |
| `/api/admin/state` | GET | Shop or system; scoped records |
| `/api/admin/cars` | POST | Assigned shop or system |
| `/api/admin/cars/:id` | PUT, DELETE | Assigned shop or system |
| `/api/admin/stores` | POST | System |
| `/api/admin/stores/:id` | PATCH, DELETE | System |
| `/api/admin/users` | POST | System; creates shop account |
| `/api/admin/users/:id` | PATCH, DELETE | System; deletion deactivates account |
| `/api/admin/reviews/:id` | PATCH | System |
| `/api/admin/settings` | PUT | System |
| `/api/health` | GET | Public |

Sessions expire after seven days. Password changes revoke earlier sessions. Suspended users or stores cannot use shop endpoints. Status transitions and inventory conflicts are checked inside database transactions.
