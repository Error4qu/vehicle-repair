## Vehicle Repair Service App

Full-stack starter project for an online vehicle repair booking service:

- Frontend: Next.js (`/src/app`)
- Backend: Go API (`/backend`)

## Prerequisites

- Node.js 18+
- Go 1.22+ ([install guide](https://go.dev/doc/install))

## Run Frontend

```bash
npm run dev
```

Frontend runs at [http://localhost:3000](http://localhost:3000).

## Run Backend

```bash
go run cmd/server/main.go
```

Backend runs at [http://localhost:8080](http://localhost:8080).

## API

- `GET /health` -> API health check
- `POST /api/bookings` -> create service booking request

Request body:

```json
{
  "fullName": "Madhav Singh",
  "phone": "9876543210",
  "vehicleType": "Car",
  "serviceType": "General Service",
  "preferredDate": "2026-03-30",
  "issueDescription": "Engine noise and brake check needed."
}
```

Set frontend API URL (optional if backend runs on localhost:8080):

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```
