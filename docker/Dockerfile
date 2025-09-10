# syntax=docker/dockerfile:1

# =========================
# Base image
# =========================
FROM node:24-alpine AS base
WORKDIR /app

COPY package*.json ./

# =========================
# Development Stage
# =========================
FROM base AS dev

RUN npm install
COPY . .

# Start Next.js in dev mode (with HMR)
CMD npm run dev

# =========================
# Builder Stage (for prod)
# =========================
FROM base AS builder

RUN npm ci --only=production
COPY . .

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
