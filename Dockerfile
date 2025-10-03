# Pull the Node.js Docker image
FROM node:20-alpine AS build

# Set working direcotry
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

RUN npm install

# Copy app files
COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html