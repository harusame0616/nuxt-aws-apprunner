FROM node:16-alpine AS dev

USER node
WORKDIR /app
COPY ./package*.json ./
RUN yarn
COPY ./ ./
CMD ["yarn", "dev"]

FROM dev AS build

RUN yarn build

FROM node:16-alpine AS production

USER node
WORKDIR /app
COPY --from=BUILD /app/.output/*  ./
CMD ["node", "./index.mjs"]
