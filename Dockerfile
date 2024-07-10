FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
