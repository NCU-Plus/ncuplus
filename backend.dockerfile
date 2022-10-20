FROM node:16.18-bullseye AS build

WORKDIR /app
COPY --chown=node:node ./backend/package.json ./backend/
COPY --chown=node:node ./backend/pnpm-lock.yaml ./backend/

# install pnpm
RUN npm i -g pnpm

USER node

# install dependencies
RUN pnpm i -C backend  

# copy project files
COPY --chown=node:node ./backend ./backend

# build
RUN pnpm -C backend build

RUN pnpm i -C backend -P

FROM node:16.18-bullseye As production

WORKDIR /home/node/app/backend
COPY --chown=node:node --from=build /app/backend/dist ./dist
COPY --chown=node:node --from=build /app/backend/node_modules ./node_modules

USER node

ENV NODE_ENV production
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
