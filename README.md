# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## .env files

In order to connect to the two databases locally, two .env files: `.env.test` and `.env.development` must be created first. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these .env files are .gitignored.


### **GET** `/api/topics`

Create an endpoint to allow client to view all the topics currently available.

_reaponds with all topics

-each topic should have the following keys:

  - `slug`
  - `description`

