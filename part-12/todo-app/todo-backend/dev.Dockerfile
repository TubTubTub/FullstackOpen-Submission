FROM node:20

WORKDIR /usr/src/todo-app/todo-backend

COPY . .

RUN npm ci

ENV DEBUG=todo-backend:*

ENV PORT=3000

CMD npm run dev