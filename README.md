## Autor

Sebastián Bonilla S.

## tecnologias
angular 22, TypeScript, HTML, CSS, Node.js, Express, MySQL 


## estructura

-frontend: angular

-backend: api express

-database: script sql

## estado

estructura inicial

## instalacion

en 2 terminales diferentes

*cd backend: npm install y npm start

*cd frontend: npm install y npm start

abrir localhost:4200 y localhost;3000

## pruebas 
- arranque backend y frontend

## uso IA

- organizacion readme
- ayuda comandos creracion del proyecto


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
