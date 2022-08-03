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

### **GET** `/api/articles/:article_id`

_responds with:

- an article object, which should have the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`

### **PATCH** `/api/articles/:article_id`

_request body accepts:

- an object in the form `{ inc_votes: newVote }`
  - newVotes will indicate how much the votes property in the database should be updated by

_responds with:

- the updated article

### **GET** `/api/users`

_responds with:

- an array of objects, each object should have the following properties:

  - `username`
  - `name`
  - `avatar_url`

### **GET** `/api/articles`

_responds with:

- an articles array of article objects, each of which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` 

- the articles should be sorted by date in descending order.