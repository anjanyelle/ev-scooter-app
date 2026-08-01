# Backend contract

The mobile app depends only on `EVRepository`. The current HTTP implementation is in `src/data/repositories/httpRepository.ts`.

## Authentication

Authentication is a two-step challenge flow. Login and signup return a short-lived challenge; only OTP verification returns a bearer session.

### `POST /auth/login`

```json
{
  "identifier": "arjun@example.com",
  "password": "••••••••"
}
```

### `POST /auth/signup`

```json
{
  "name": "Arjun Mehta",
  "identifier": "+919876543210",
  "password": "••••••••"
}
```

Expected challenge response from login/signup:

```json
{
  "challengeId": "auth_ch_01J...",
  "deliveryHint": "+91 ••••••3210",
  "expiresAt": "2026-07-29T15:10:00Z"
}
```

### `POST /auth/verify-otp`

```json
{
  "challengeId": "auth_ch_01J...",
  "code": "2468"
}
```

Expected verified session response:

```json
{
  "token": "jwt-or-session-token",
  "createdAt": "2026-07-29T15:00:00Z",
  "user": {
    "id": "usr_001",
    "name": "Arjun Mehta",
    "email": "arjun@example.com",
    "phone": "+91 98765 43210",
    "avatarInitials": "AM"
  }
}
```

### `POST /auth/resend-otp`

```json
{ "challengeId": "auth_ch_01J..." }
```

Return a refreshed challenge response. Apply rate limits, invalidate superseded challenges, never log passwords or OTPs, and expire the challenge server-side.

## Dashboard

### `GET /vehicle/current-status`

Returns `DashboardPayload`, containing `user`, `vehicle`, `health`, `carbonSavedKg` and `nextServiceKm`.

Vehicle telemetry shape:

```json
{
  "vin": "LEX26HYD8M0042187",
  "model": "LEXICON One S",
  "nickname": "Lexi",
  "registrationNumber": "TS 09 EV 2048",
  "firmwareVersion": "LEX OS 4.8.2",
  "batteryPercentage": 82,
  "range": 104,
  "batteryHealth": 97,
  "temperature": 31.5,
  "odometerKm": 1247,
  "status": "parked",
  "isLocked": true,
  "isCharging": false,
  "lastSyncAt": "2026-07-29T15:28:00Z",
  "location": {
    "latitude": 17.4427,
    "longitude": 78.3772,
    "label": "LEXICON One S",
    "address": "Mindspace Road, HITEC City, Hyderabad"
  },
  "lastParkedLocation": {
    "latitude": 17.4419,
    "longitude": 78.3764,
    "label": "Last parked",
    "address": "Raheja Mindspace, Madhapur, Hyderabad"
  }
}
```

## Rides

### `GET /rides/statistics?period=day|week|month|year`

Returns totals, trends, chart points, ride records and trip-detail maxima. See `RideStatsPayload` and `RideRecord` in `src/types/domain.ts`.

## Charging

### `GET /charging/overview`

Returns current charging metrics, history summary, nearby stations and charging sessions. Currency fields are numeric INR values and are rendered with the `₹` symbol by the UI.

## Notifications

### `GET /notifications`

Supported `type` values:

- `battery`
- `charging`
- `theft`
- `tow`
- `crash`
- `ota`
- `service`

Supported `severity` values: `info`, `success`, `warning`, `critical`.

## Service

### `GET /service/overview`

Returns the service due date/distance, dealers, documents and service history.

### `POST /service/bookings`

```json
{
  "dealerId": "dealer_001",
  "date": "2026-08-01",
  "slot": "11:00 AM"
}
```

Response:

```json
{
  "bookingId": "LEX-SVC-482910",
  "message": "Service booked for 2026-08-01 at 11:00 AM"
}
```

## Vehicle commands

### `POST /vehicle/commands`

```json
{ "command": "lock" }
```

Supported commands: `lock`, `unlock`, `lights`, `horn`, `stop_charging`.

Command response:

```json
{ "message": "Scooter locked securely" }
```

## HTTP behavior

- Send `Authorization: Bearer <token>` when a local session exists.
- Return JSON for successful requests.
- Return a meaningful response body for non-2xx requests; the repository converts it into an exception.
- Treat command acceptance as asynchronous at the backend even though the local preview adapter resolves immediately.
- Use ISO 8601 timestamps with offsets or UTC.
- Keep units explicit in field names: `Km`, `Kmph`, `KWh`, `WhPerKm`, `Minutes`, `Percentage`.

## Production transport requirements

- All production endpoints must use HTTPS.
- The app sends `X-Request-Id` on every request for end-to-end tracing.
- Vehicle commands and service bookings send `Idempotency-Key`; the backend must store and honor it so duplicate taps or network replays do not execute twice.
- GET requests may be retried on network errors and HTTP 502/503/504. Mutating requests are not automatically retried.
- The default client timeout is 15 seconds.
- Return structured errors when possible:

```json
{
  "code": "VEHICLE_OFFLINE",
  "message": "The vehicle is offline and cannot accept this command."
}
```

- Remote command authorization must verify the authenticated user currently owns or is permitted to control the VIN.
- A production command response should include a server command ID and acknowledgement state. The existing `message` field is retained for the current UI contract.
