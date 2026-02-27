# SmartCard (Backend API)

`smart-card-be` is the Express + PostgreSQL backend for the SmartCard frontend app. It serves flashcard data, handles card CRUD routes, and includes user/auth route scaffolding for protected user-specific cards.

## Project Description

This API currently provides:

- flashcard data storage in PostgreSQL
- card endpoints for create/read/search/delete/edit operations
- user endpoints for register/login
- protected user-card endpoints using authentication middleware

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
- `POST /cards` - create card
- `DELETE /cards/delete/:id` - delete card
- `PUT /cards/edit/:id` - edit card

### User/Auth Routes

- `POST /users/register` - register user
- `POST /users/login` - login user
- `POST /users/create` - create user card (protected)
- `GET /users/cards/:id` - get user cards (protected)

## How It Connects To `smart-card`

- Frontend (`smart-card`) calls this API at `http://localhost:8000`.
- Backend must be started before using frontend card features.
- The frontend currently uses `/cards` endpoints for active study/card flows.
- Auth-related frontend screens are intended to integrate with `/users` routes as that flow is completed.

## Current Status

- Core backend for flashcards is active and connected to frontend.
- User/auth routes exist and are partially integrated into the full product flow.
- Project is currently set up for local development.