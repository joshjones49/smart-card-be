# SmartCard (Backend API)

`smart-card-be` is the Express + PostgreSQL backend for the SmartCard frontend app. It serves flashcard data, handles card CRUD routes, and enforces role-based access control (guest/user/admin) with card ownership rules.

## Project Description

This API currently provides:

- flashcard data storage in PostgreSQL
- card endpoints for create/read/search/delete/edit operations
- user endpoints for register/login/profile
- RBAC + ownership enforcement for protected card mutations

The backend runs locally on port `8000` and is consumed by the `smart-card` frontend.

## Skills / Technologies Used

- **Node.js** runtime
- **Express** for API routing and middleware
- **PostgreSQL** (`pg` Pool) for persistence
- **dotenv** for environment variable configuration
- **cors** for local frontend/backend communication
- **bcrypt** for password hashing
- **jsonwebtoken** for auth token workflows
- **nodemon** for local development restarts
- **Vitest** for tests

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL running locally (or accessible remotely)

### Environment Variables

Create a `.env` file in the `smart-card-be` root with:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### Install

```bash
npm install
```

### Apply Database Migration (Required)

Run the migration before starting the app so role/ownership columns exist:

```bash
psql -U postgres -d smartcard -f "database/rbac_owner_migration.sql"
```

### Run

```bash
npm start
```

This starts the API using nodemon at `http://localhost:8000`.

## Available Scripts

- `npm start` - run API with nodemon (`server/server.mjs`)
- `npm test` - run Vitest

## Main Routes

### Card Routes

- `GET /cards` - get all cards
- `GET /cards/:search` - search cards
- `POST /cards` - create card (auth required)
- `DELETE /cards/delete/:id` - delete card (owner/admin only)
- `PUT /cards/edit/:id` - edit card (owner/admin only)

### User/Auth Routes

- `POST /users/register` - register user
- `POST /users/login` - login user
- `GET /users/me` - get logged-in user profile (protected)
- `GET /users/me/cards` - get logged-in user's cards (protected)

## RBAC Rules

- `guest`: can view/search cards only
- `user`: guest permissions + can create cards + can edit/delete only own cards
- `admin`: full access to create/edit/delete cards

## How It Connects To `smart-card`

- Frontend (`smart-card`) calls this API at `http://localhost:8000`.
- Backend must be started before using frontend card features.
- The frontend currently uses `/cards` endpoints for active study/card flows.
- Auth-related frontend screens are intended to integrate with `/users` routes as that flow is completed.

## Current Status

- Core backend for flashcards is active and connected to frontend.
- Auth/profile routes and RBAC checks are implemented.
- Project is set up for local development (requires migration applied).