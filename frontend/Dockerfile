# -------- Build Stage --------
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# -------- Production Stage --------
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3500
CMD ["nginx", "-g", "daemon off;"]
