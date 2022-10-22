# NCU+ Frontend V2

## Introduction

NCU+ Frontend V2 is a course feedback website for National Central University students. Allow students to view or submit their course feedbacks.

## Features

- Course Search
- Anonymous
- Course Feedbacks
- Course Comments
- NCU Portal Login
- Markdown Support

## Development

Install dependencies:

```bash
pnpm i
```

Set environment variables:

```bash
cp .env.example .env
# Edit .env file to fit your environment
```

Start the development server on http://localhost:3001

> You must run [backend server](https://github.com/NCU-Plus/ncuplus/tree/master/backend) before below command.

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## License

NCU Plus is [AGPL licensed](LICENSE).
