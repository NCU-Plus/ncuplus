FROM node:16.15.1-bullseye AS build

WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
USER node

FROM node:16.15.1-bullseye As production

WORKDIR /home/node/app
COPY --chown=node:node --from=build /app/.output ./.output

ENV NODE_ENV production
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]