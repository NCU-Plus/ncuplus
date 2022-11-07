# NCU Plus Backend

## Introduction

NCU Plus website backend. Provide RESTFUL resource api endpoints for frontend. Everyone can directly access courses information by using this api. Course information is imported by [Course Fetcher](https://github.com/NCU-Plus/course-fetcher).

## Development

Install dependencies:

```bash
pnpm i
```

Set environment variables:

```bash
cp .env.example .env
cp db.env.example db.env
# Edit *.env files to fit your environment
```

Run test database:

```bash
docker-compose up -d --build
```

> Database is bind to port 3306, and Adminer is bind to port 8080 by default.

Start server:

```bash
pnpm start:dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## License

NCU Plus is [AGPL licensed](LICENSE).
