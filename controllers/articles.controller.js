const { selectArticleById, putArticleById, selectArticles, selectCommentsByArticleId, insertCommentByArticleId } = require('../models/articles.models');

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

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    selectCommentsByArticleId(article_id).then((comments) => {
        res.status(200).send(comments);
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
 
    insertCommentByArticleId(article_id, username, body).then((comment) => {
        res.status(201).send({ comment});
    })
    .catch(next);
};