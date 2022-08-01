const { selectArticleById, putArticleById } = require('../models/articles.models');

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
        console.log(article)
        res.status(200).send({ article })
    })
    .catch(next);
};