# syntax=docker/dockerfile:1

# =========================
# Builder Stage
# =========================
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY ../.. .

RUN npm run build

# =========================
# Production Stage
# =========================
FROM node:24-alpine AS prod
WORKDIR /app

EXPOSE 3000
ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app ./

CMD npm start
