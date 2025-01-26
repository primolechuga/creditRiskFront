# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Instalar dependencias del sistema operativo necesarias para compilación
RUN apk add --no-cache python3 make g++

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar Angular CLI (especificar versión si es necesario)
RUN npm install -g @angular/cli

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación para producción
RUN npm run build --prod

# Etapa 2: Servidor para producción
FROM nginx:stable-alpine

# Copiar los archivos de build al servidor NGINX
COPY --from=builder /usr/src/app/dist/tu-nombre-app /usr/share/nginx/html

# Exponer el puerto que usará NGINX
EXPOSE 80

# Comando por defecto para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]