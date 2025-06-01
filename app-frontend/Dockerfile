# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app

# 1) package.json va package-lock.json ni nusxalaymiz
COPY package*.json ./

# 2) Bog‘liqliklarni o‘rnatamiz
RUN npm install

# 3) Butun frontend kodini nusxalaymiz
COPY . ./

# 4) React ilovasini build qilamiz
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# 5) build qilingan fayllarni Nginx html katalogiga nusxalaymiz
COPY --from=build /app/build /usr/share/nginx/html

# 6) Custom nginx.conf ni o‘rniga qo‘yamiz
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 7) 80-portni expose qilamiz
EXPOSE 80

# 8) Nginx ni ishga tushiramiz
CMD ["nginx", "-g", "daemon off;"]
