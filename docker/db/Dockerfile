# Use lightweight Alpine
FROM alpine:latest

# Install SQLite
RUN apk add --no-cache sqlite

# Set working directory inside container
WORKDIR /app

# Copy schema and seed files from project root's db directory
COPY ../../db/*.sql ./
