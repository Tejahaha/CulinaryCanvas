# Build stage
FROM node:18 AS build-stage
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
