# ---------- Build ----------
ARG REACT_APP_BACKEND_URL=http://localhost:30083
ARG VITE_BASE=/

FROM node:18 AS build
ARG REACT_APP_BACKEND_URL
ARG VITE_BASE

WORKDIR /app

# Copy ONLY frontend code (because Dockerfile is inside FreshFork-Frontend)
COPY . .

# Pass backend URL to Vite environment
ENV VITE_BACKEND_URL=${REACT_APP_BACKEND_URL}

RUN npm install --legacy-peer-deps
RUN npm run build -- --base ${VITE_BASE}

# ---------- Serve ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
