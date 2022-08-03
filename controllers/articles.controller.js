const { selectArticleById, putArticleById, selectArticles } = require('../models/articles.models');

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;

    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article});
    })
    .catch(next);
};

exports.patchArticalById = (req, res, next) => {
    const { article_id } = req.params;
    const changes = req.body; 
    
    putArticleById(article_id, changes).then((article) => {
        res.status(200).send({ article })
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  
    selectArticles().then((articles) => {
        res.status(200).send(articles);
    })
    .catch(next);
};