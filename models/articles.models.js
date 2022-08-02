const db = require('../db/index');

exports.selectArticleById = (article_id) => {
    return db
      .query("SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM comments RIGHT JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;", [article_id])
      .then(({rows: [article]}) => {
        if(!article) {
            return Promise.reject({
                status: 404,
                msg: 'Article not found'
            });
        }
        return article;
      });
};

exports.putArticleById = (article_id, changes) => {
   const newVote = changes.inc_votes
   if(typeof newVote !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'Invalid input'
    })
   };
    return db
    .query(`UPDATE articles SET votes = votes + ${newVote} WHERE article_id = $1 RETURNING *`, [article_id])
      .then(({rows: [article]}) => {
        if(!article) {
            return Promise.reject({
                status: 404,
                msg: 'Article not found'
            });
        }
        return article;
      });
};


// .query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM comments RIGHT JOIN artilces ON articles.article_id = comments.article_id WHERE article_id = $1', [article_id])

// .query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id WHERE article_id = $1', )