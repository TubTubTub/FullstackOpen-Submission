FROM node:20

WORKDIR /usr/src/todo-app/todo-backend

COPY --chown=node:node . .

COPY . .

RUN npm ci

ENV DEBUG=playground:*
ENV PORT=3000

USER node
CMD npm start