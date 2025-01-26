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

# Etapa 2: Producción
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
RUN npm install -g serve

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

WORKDIR /usr/src/app

EXPOSE 80

CMD [ "serve", "-s", "dist", "-l", "80" ]