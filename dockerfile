# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor (Nginx para servir el contenido estático)
FROM nginx:alpine
COPY --from=build /app/dist/index /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]