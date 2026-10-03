# ShortMyUrl

A fast and lightweight URL shortener built with Node.js, Express, TypeScript, tRPC, MongoDB, and Redis.

## Features

- Shorten long URLs into compact, shareable links
- Redirect short URLs to their original destinations
- Redis-backed caching for fast lookups
- MongoDB persistence via Mongoose
- End-to-end type-safe APIs with tRPC + Zod validation
- Request correlation IDs and structured logging with Winston
- Centralized error handling

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **API:** tRPC v11
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (ioredis)
- **Validation:** Zod
- **Logging:** Winston + daily rotate files

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis

### Installation

```bash
git clone https://github.com/Ayhampt/ShortMyUrl.git
cd ShortMyUrl
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/short_my_url
REDIS_URL=redis://localhost:6378
REDIS_COUNTER_KEY=short_my_url_counter
BASE_URL=http://localhost:8000
```

### Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:8000`.

## API

### tRPC endpoints (mounted at `/trpc`)

| Procedure | Type | Input | Description |
|-----------|------|-------|-------------|
| `url.create` | Mutation | `{ originalUrl: string }` | Create a new short URL |
| `url.getOriginalUrl` | Query | `{ shortUrl: string }` | Get the original URL for a short code |

### REST endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/:shortUrl` | Redirect to the original URL |
| `GET` | `/api/v1/ping` | Health check |

## Project Structure

```
src/
├── config/         # App config, DB, Redis, logger
├── controllers/    # Request handlers / tRPC procedures
├── dto/            # Data transfer objects
├── middlewares/    # Correlation ID, error handling
├── models/         # Mongoose models
├── repositories/   # Cache & URL data access
├── routers/        # REST (v1) and tRPC routers
├── services/       # Business logic
├── utils/          # Helpers, errors, base62
└── validators/     # Zod validators
```

## License

ISC
