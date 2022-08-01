const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers');


app.get('/api/topics', getTopics);

app.all('/*', (req, res) => {
    res.status(400).send({ msg: 'Route not found'});
});

//////////////////////////

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Bad request'});
    } else next(err);
})

app.use((err, req, res, next) => {
    res.ststus(err.status).send({msg: err.msg});
});

module.exports = app;