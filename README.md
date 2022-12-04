# NCU+

## Introduction

NCU+ is a course feedback website for National Central University students. Allow students to view or submit their course feedbacks.

## Features

- Course Search
- Anonymous
- Course Feedbacks
- Course Comments
- NCU Portal Login
- Markdown Support

## Development

You must install pnpm first. If you have not installed it, please install it first.

```bash
npm install -g pnpm
```

Install dependencies:

```bash
pnpm i
```

Set environment variables:

```bash
# Edit .env file to fit your environment

# frontend
cp apps/frontend/.env.example apps/frontend/.env

# backend
cp apps/backend/.env.example apps/backend/.env
cp apps/backend/db.env.example apps/backend/db.env
```

Run test database:

```bash
cd backend && docker compose up -d --build
```

> Database is bind to port 3306, and Adminer is bind to port 8080 by default.

Start development servers:

```bash
pnpm dev
```

You can view the frontend at http://localhost:3001 and the backend at http://localhost:3000. Frontend will proxy all requests which url starts with `/open-api` to backend.

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
# server would be started at http://localhost:4000
pnpm start:preview
```

## Testing

### Unit Testing

```bash
pnpm test
```

### E2E Testing

If databasee is started, you can run e2e tests.

```bash
pnpm build:frontend
pnpm start:e2e

# Run the following command if you need to run seeder
pnpm build:backend

# Run cypress test in cypress app
pnpm cypress open

# Run cypress test in terminal
pnpm cypress run
```

> `pnpm start:e2e` will start a proxy server at `http://localhost:4000`. It would proxy all requests which url starts with `/open-api` to backend and other requests to frontend.

## License

NCU Plus is [AGPL licensed](LICENSE).
