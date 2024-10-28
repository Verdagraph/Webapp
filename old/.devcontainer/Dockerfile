# Python and Node base image
FROM node:23

# Working directory
WORKDIR /workdir

# Install frontend dependencies
COPY ./frontend/package.json ./frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .