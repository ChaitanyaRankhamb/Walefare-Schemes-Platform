# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Backend Dockerfile (Express + TypeScript via `tsx`)
# -----------------------------------------------------------------------------
#
# Your backend currently:
# - runs directly from TypeScript using `tsx`
# - does NOT have a build script that outputs `dist/`
# - requires several environment variables at module-load time
#
# So for a production-ready container that works with docker-compose
# (MongoDB + Redis), we run the app with `tsx` and rely on env vars provided
# by `docker-compose.yml` (via `env_file` + `environment` overrides).
#
# SECURITY NOTE:
# - Do NOT bake secrets into the image.
# - Keep using `docker-compose.yml` with `env_file: ./Backend/.env`.
#

FROM node:20-slim

WORKDIR /backend

ENV NODE_ENV=production

# Install dependencies (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Your app depends on `tsx` at runtime but `tsx` is not in dependencies.
# Install it during image build (no-save) so container startup is reliable.
RUN npm install --no-save tsx

# Copy source code
COPY ts.config.json ./
COPY src ./src

EXPOSE 4000

# Start the server from TypeScript (tsx transpiles on the fly).
# Runtime configuration (MONGODB_URI, REDIS_URL, JWT_* secrets, etc.) is
# provided by docker-compose.
CMD ["npx", "tsx", "src/app.ts"]