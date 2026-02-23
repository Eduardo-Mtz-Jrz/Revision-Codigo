# Etapa 1: Compilación
FROM node:20-alpine AS build
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración primero (optimiza el caché)
COPY package*.json ./
# Instala las dependencias
RUN npm install

# Copia TODO el código fuente del proyecto
COPY . .
# Genera el build de producción
RUN npm run build

# Etapa 2: Servidor Web Nginx
FROM nginx:alpine

# CORRECCIÓN DE RUTA:
# Usamos RevisionCodigo (con mayúsculas) y apuntamos a /browser
# Si falla, intentaremos sin el /browser al final.
COPY --from=build /app/dist/RevisionCodigo/browser /usr/share/nginx/html

# Configuración para que las rutas de Angular funcionen (SPA)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
