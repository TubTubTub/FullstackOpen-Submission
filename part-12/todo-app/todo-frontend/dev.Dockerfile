FROM node:20

WORKDIR /usr/src/todo-app/todo-frontend

COPY . .

ENV VITE_BACKEND_URL="http://localhost:3000"

RUN npm ci

CMD ["npm", "run", "dev", "--", "--host"]