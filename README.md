# Property Listings

A full-stack property marketplace where users can publish new listings and browse other rentals, sales, exchanges, or donation properties.

## Live Demo

- Live version of this project: [Live-Demo](https://properties.byserafeim.dev/)

## Tech Stack

- React.js
- React Router
- Node.js
- Express.js
- Sequelize
- MySQL DB

## App Features

- **List a property** through a form by filling its information in the relevant fields.
- **Area autocomplete** suggestions are presented to users while they type their property's area information.
- **Browse listings** in listed properties page.
- **Filter & sort** by type/price the listed properties in the properties page.
- **RESTful API** – JSON endpoints for property basic actions (create & list) plus area suggestions.
- **Container-ready** – Docker Compose spins up the frontend, backend, and database with initial schema/data.

## Getting Started

### Environment Variables

#### Backend (`backend/.env`)

```ini
DATABASE_URL=mysql_conn_url
BACKEND_PORT=api_port
AREA_SERVICE_URL=autocomplete_area_external_url
```

- `DATABASE_URL` – Sequelize connection string (`mysql://USER:PASS@HOST:PORT/DB`).
- `BACKEND_PORT` – Port exposed by the Express API.
- `AREA_SERVICE_URL` – External endpoint that returns suggestion.

#### Frontend (`frontend/.env`)

```bash
VITE_BACKEND_URL=http://localhost:{port}/api/v1/
```

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Initialize the Database

1. Start MySQL and create the target database/user referenced in `DATABASE_URL`.
2. Run the initialization scripts:

   ```bash
   mysql -u <user> -p <database> < ../backend/db/sql/001_init.sql
   mysql -u <user> -p <database> < ../backend/db/sql/002_data.sql
   ```

   These scripts create the `property` table and add sample listings.

### Run the Backend

```bash
cd backend
npm run dev
```

### Run the Frontend

```bash
cd frontend
npm run dev
```

### Docker Compose Workflow

1. Create a `.env` file in the repository root with the following variables:

   ```ini
   # Database
   PROP_DB_URL=mysql_conn_url
   PROP_DB_ROOT_PASS=pass
   PROP_DB_DB=db
   PROP_DB_USER=user
   PROP_DB_USER_PASS=pass

   # Backend
   DATABASE_URL=mysql_conn_url
   BACKEND_PORT=port
   AREA_SERVICE_URL=autocomplete_area_external_url

   # Frontend
   VITE_BACKEND_URL=http://localhost:{port}/api/v1/
   ```

2. Build and start the stack:

   ```bash
   docker compose up --build
   ```

   - Backend: http://localhost:9000
   - Frontend: http://localhost:3001
   - MySQL: available on port `3307` with schema/data auto-seeded from `backend/db/sql`.

## API Reference

### `GET /api/v1/properties`

Returns all properties ordered by `list_date DESC` unless overridden.

Query parameters:

- `sorting` – optional (`asc` or `desc`) to sort by price.
- `filtering` – optional, one of `Rent`, `Buy`, `Exchange`, `Donation`.

### `POST /api/v1/properties`

Creates a new listing.

Required JSON body fields:

| Field     | Type    | Notes                                         |
| --------- | ------- | --------------------------------------------- |
| `title`   | string  | 1–155 characters                              |
| `type`    | enum    | `Rent`, `Buy`, `Exchange`, or `Donation`      |
| `area_id` | string  | Place identifier returned by the area service |
| `area`    | string  | Human-readable area text                      |
| `price`   | integer | Stored in euros                               |

Optional fields: `description`, `floor_level`, `square_meters`, `bedrooms`, `bathrooms`, `year_built`, `furnished` (boolean).

Validation errors return `400` with a descriptive message; unexpected failures return `500`.

### `GET /api/v1/areas?input=<query>`

Proxy endpoint that calls the configured area suggestion service and returns its payload. Responds with `400` if `input` is missing.
