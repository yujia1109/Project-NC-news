const express = require('express');
const app = express();
app.use(express.json());
const { getTopics } = require('./controllers/topics.controllers');
const { getArticleById, patchArticalById, getArticles, getCommentsByArticleId, postCommentByArticleId } = require('./controllers/articles.controller');
const { getUsers } = require('./controllers/users.controllers');
const { deleteCommentById } = require('./controllers/comments.controllers')
const { getEndpoints } = require('./controllers/endpoints.controller');


app.get('/api/', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchArticalById);

app.get('/api/users', getUsers);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);


app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.delete('/api/comments/:comment_id', deleteCommentById);

// app.all('/*', (req, res) => {
//     res.status(400).send({ msg: 'Route not found'});
// });

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
    if (err.code === '23503') {
      res.status(404).send({ msg: 'Article not exist' });
    } else next(err);
  });
  
  app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
  });


module.exports = app;