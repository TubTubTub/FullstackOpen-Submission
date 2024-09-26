FROM node:20 AS build-stage

WORKDIR /usr/src/todo-app/todo-frontend

COPY . .

ENV VITE_BACKEND_URL="http://localhost:8080/api"

RUN npm ci

RUN npm run build

FROM node:20 AS testing-stage

WORKDIR /usr/src/todo-app/todo-frontend

COPY --from=build-stage /usr/src/todo-app/todo-frontend .

RUN npm run test

FROM nginx:1.25-alpine

COPY --from=testing-stage /usr/src/todo-app/todo-frontend/dist /usr/share/nginx/html