FROM node:18-alpine AS builder

ARG PORT=3000

WORKDIR /src

# Build
FROM builder as build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Run
FROM builder

ENV PORT=$PORT
ENV NODE_ENV=production
WORKDIR /src

COPY --from=build /src/.nuxt /src/.nuxt
COPY --from=build /src/static /src/static
COPY --from=build /src/nuxt.config.js /src/nuxt.config.js
COPY --from=build /src/package.json /src/package.json

CMD [ "npx", "nuxt", "start" ]