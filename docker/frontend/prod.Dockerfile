# =========================
# Builder Stage
# =========================
FROM node:24-slim AS builder

WORKDIR /app

# Install build dependencies for Debian-based image
RUN apt-get update \
    && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --only=production
RUN npm install better-sqlite3 --build-from-source

COPY ../.. .

RUN npm run build

# =========================
# Production Stage
# =========================
FROM node:24-slim AS prod
WORKDIR /app

# Install runtime dependencies for sqlite3
RUN apt-get update \
    && apt-get install -y \
    sqlite3 \
    libsqlite3-0 \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000
ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app ./

CMD npm start