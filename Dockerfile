# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /todolist
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD [ "node", "dist/main.js" ]