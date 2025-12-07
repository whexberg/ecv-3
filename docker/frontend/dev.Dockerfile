FROM node:24-slim AS base
WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY ./package*.json ./
RUN npm install
RUN npm install better-sqlite3 --build-from-source

COPY . .

CMD npm run dev
