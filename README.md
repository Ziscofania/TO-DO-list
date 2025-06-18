# TO-DO List App with Docker

Aplicación fullstack para gestión de tareas con Node.js (backend), HTML/CSS/JS (frontend) y MongoDB, dockerizada.

## 🚀 Requisitos previos
- Docker instalado ([Windows/Mac](https://www.docker.com/products/docker-desktop) | [Linux](https://docs.docker.com/engine/install/))
- Docker Compose (viene con Docker Desktop)
- Git (opcional)

## 🐳 Despliegue con Docker

### 1. Clonar el repositorio (opcional)
```bash
git clone https://github.com/Ziscofania/TO-DO-list.git
```
```bash
cd TO-DO-list
```
2. Construir y levantar los contenedores
```bash
docker-compose up --build
```
Nota: La primera vez tardará varios minutos en descargar las imágenes.

3. Acceder a la aplicación
Frontend: http://localhost
API Backend: http://localhost:5000/api/todos

🛠 Comandos útiles
Comando	Descripción
```bash 
docker-compose up -d	Levantar en segundo plano
```
```bash 
docker-compose down	Detener contenedores
```
```bash 
docker-compose down -v	Detener y eliminar volúmenes (¡borra datos!)
```
```bash 
docker-compose logs -f	Ver logs en tiempo real
```
```bash 
docker-compose restart backend	Reiniciar solo el backend
```
📦 Estructura de contenedores

frontend: Servidor Nginx (puerto 80)

backend: API Node.js (puerto 5000)

mongo: Base de datos MongoDB (puerto 27017)

🔧 Troubleshooting
Si MongoDB no inicia:
```bash
docker-compose restart mongo
```
```bash
docker-compose logs mongo
```
Si el frontend no se conecta al backend:

Verifica que los servicios estén activos:
bash

curl http://localhost:5000/api/todos

Para reconstruir todo desde cero:
```bash
docker-compose down -v
```
```bash
docker system prune -a
```
```bash
docker-compose up --build
```
