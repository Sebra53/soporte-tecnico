## Autor

Sebastián Bonilla S.

## tecnologias
angular 22, TypeScript, HTML, CSS, Node.js, Express, MySQL 


## Estructura
- frontend/src/app/components/: cabecera, menú, inicio y vistas de tickets
- frontend/src/app/models/ticket.ts: contrato de datos Ticket y TicketNuevo
- frontend/src/app/services/tickets.ts: cinco operaciones HttpClient
- frontend/src/app/app.routes.ts: navegación de la aplicación
- frontend/src/styles.css: diseño común y prioridades
- backend/server.js: validaciones, endpoints y respuestas HTTP
- backend/db.js: pool de conexiones MySQL
- backend/.env.example: configuración de ejemplo sin credenciales reales
- database/crear-base.sql: esquema reproducible
- database/datos-prueba.sql: carga opcional de cinco ejemplos

## estado

estructura inicial

implemento frontend: componentes: cabecera, menu, inicio, tickets,nuevoticket y editarticket

aun no conectado a base de datos (commit 2)

backend funcional conectado a base de datos (commit 3)

conexion backend y frontend (commit 4)

pruebas y evidencia del proyecto (commit 5)

## Variables de entorno
backend/.env.example contiene valores de ejemplo:
 
```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=CAMBIAR
DB_NAME=soporte_tecnico
PORT=3000
```


## instalacion
copiar contenido en .env.exmple en .env

ejecutar crear-base.sql para crear base de datos

en 2 terminales diferentes

*cd backend: npm install y npm start

*cd frontend: npm install y npm start

abrir localhost:4200 y localhost;3000

## pruebas 
- arranque backend y frontend

- navegacion por los distintos componentes/vistas

- comprobacion reglas de los datos
- comprobacion post, get, delete

- persistencia base de datos
- conexion frontend y backend
- registro, edicion y eliminado desde frontend

- get select y listado: imagen 1
- consulta id ver y editar: imagen 2
- post registrar ticket: imagen 3
- validacion datos: imagen 4
- desconeccion backend: imagen 5

## uso IA

- organizacion readme
- ayuda comandos creracion del proyecto
- estilo (css) generado por la ia
- ayuda comprension errores en codigo de referencia (actividades semanales angular)(errores de carga)
- diseño base de datos
- mensajes de error  
- datos de prueba (pruebas.sql)
- ##estructura readme 
## creacion proyecto 

mkdir soporte-tecnico

cd soporte-tecnico

git init

git branch -M main

ng new frontend --routing --style=css --standalone --skip-tests --skip-git --ssr=false --defaults

mkdir backend

mkdir database

cd backend

npm init -y

npm install express cors

npm pkg set scripts.start="node server.js"

cd ..

ng g c components/cabecera

ng g c components/menu

ng g c components/inicio

ng g c components/tickets 

ng g c components/nuevo-ticket

ng g c components/editar-ticket

ng g i models/ticket

ng g s services/tickets

