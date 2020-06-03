# Strapi-starter

A strapi application with example of activities

### How to Setup Server:
- run `npm i` to install dependencies
- create `.env` to set env variables
- copy all variables from .env.example and set the value
- run `npm run develop` to start development server
- run `npm run build` to build strapi app
- run `npm run start` to start server

To Setup Database
- go to `docs` directory
- run command `docker-compose up -d` using this command you can install mariadb image on docker
- to dump data you can use `strapi.sql`
  - DB credentials
    user- user
    password- password
