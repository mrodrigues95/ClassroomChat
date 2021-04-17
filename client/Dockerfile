FROM node:14.16.0-alpine
EXPOSE 3000

WORKDIR /app/frontend

## Copy frontend files
COPY client/package.json ./
COPY client/yarn.lock ./

# Install frontend dependencies
RUN yarn install