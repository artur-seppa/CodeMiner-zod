# Zod Challenge

## Setup
The database is run inside a Docker container. Make sure to have Docker and Docker compose installed.

**Start the application:**
```
$ docker compose up -d
$ npm i # install dependencies
$ npm run db:create:dev
$ npm run db:migrate:dev
$ npm run dev # start server
```

**Running tests**:
```
$ npm run db:create:test
$ npm run db:migrate:test
$ npm run test
```