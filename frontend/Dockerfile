FROM node:18-alpine AS builder
WORKDIR /app
# Copia primero los archivos de dependencias
COPY package*.json ./
RUN npm install
# Luego copia el resto
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80