# Dockerfile
# Multi-stage build: Node (build) → Nginx (serve)
# Produces a tiny ~15MB image serving static files
# RELEVANT FILES: docker/nginx.conf, package.json, vite.config.ts

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
