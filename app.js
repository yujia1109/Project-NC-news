const express = require('express');
const app = express();
app.use(express.json());
const { getTopics } = require('./controllers/topics.controllers');
const { getArticleById, patchArticalById } = require('./controllers/articles.controller');
const { getUsers } = require('./controllers/users.controllers');


app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchArticalById);

app.get('/api/users', getUsers);


app.all('/*', (req, res) => {
    res.status(400).send({ msg: 'Route not found'});
});

//////////////////////////


app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  });
  
  app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Invalid input' });
    } else next(err);
  });
  
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  });


module.exports = app;