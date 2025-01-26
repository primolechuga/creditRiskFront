
# Stage 1: Build the application
FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["npx", "http-server", "dist"]