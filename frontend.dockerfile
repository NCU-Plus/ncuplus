FROM node:16.18-bullseye AS build

WORKDIR /app
COPY --chown=node:node ./frontend/package.json ./frontend/
COPY --chown=node:node ./frontend/pnpm-lock.yaml ./frontend/

# install pnpm
RUN npm i -g pnpm

USER node

# install dependencies
RUN pnpm i -C frontend --shamefully-hoist  

# copy project files
COPY --chown=node:node ./frontend ./frontend
COPY --chown=node:node ./types ./types

# build
RUN pnpm -C frontend build

FROM node:16.18-bullseye As production

WORKDIR /home/node/app/frontend
COPY --chown=node:node --from=build /app/frontend/.output ./.output

USER node

ENV NODE_ENV production
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]