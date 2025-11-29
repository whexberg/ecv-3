# syntax=docker/dockerfile:1
FROM node:24-alpine AS base
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

CMD npm run dev
