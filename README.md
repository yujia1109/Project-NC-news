# Yujia-News API

## Server on heroku

Hosted version link (https://yujia-news.herokuapp.com/api)


## Background

This project is building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service which should provide this information to the front end architecture.

The endpoints.json file describes all the available endpoints on this API.


## Installation

The database for this project is PSQL, and can be interacted with it using [node-postgres](https://node-postgres.com/).

### Technology

- Node.js (v16.15.1) (https://nodejs.org/en/)

### DevDependencies and dependencues

The package.json file contains all the devDependencies and dependencies used in this project.

_DevDependencies

- husky (v7.0.0) (https://www.npmjs.com/package/husky)
- jest (v27.5.1) (https://www.npmjs.com/package/jest)
- jest-extended (v2.0.0) (https://www.npmjs.com/package/jest-extended)
- jest-sorted (v1.0.14) (https://www.npmjs.com/package/jest-sorted)
- pg-format (v1.0.4) (https://www.npmjs.com/package/pg-format)
- supertest (v8.7.3) (https://www.npmjs.com/package/supertest)

_Dependencies

- body-parser (v1.20.0) (https://www.npmjs.com/package/body-parser)
- dotenv (v16.0.0) (https://www.npmjs.com/package/dotenv)
- express (v4.18.1) (https://expressjs.com)
- pg (v8.7.3) (https://node-postgres.com)


## Database

### Database creating

- Run script "npm setup-dbs" to create the development and test databases.

### Database connecting

- In order to connect to the two databases locally, two .env files: `.env.test` and `.env.development` must be created first. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names).Both of these .env files are .gitignored.

### Database seeding

- Run script "npm seed" to populate the development database. 
- The app.test.js file is populated with test database.


## Running the project

- Testing

  All test files are held in `tests` folder, run with the script "npm test" for testing.

- Cloud hosting 
  https://devcenter.heroku.com/start
