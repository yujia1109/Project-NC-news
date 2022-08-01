const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers');
const { getArticleById } = require('./controllers/articles.controller')


app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

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