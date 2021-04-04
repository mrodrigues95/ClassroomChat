FROM node:13.13.0-alpine
EXPOSE 3000

## Copy frontend files
WORKDIR /app/frontend
COPY package*.json ./
COPY client/package*.json ./

# Install frontend dependencies
RUN yarn install