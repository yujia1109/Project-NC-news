const db = require('../db/index');

exports.selectArticleById = (article_id) => {
    return db
      .query('SELECT * FROM articles WHERE article_id = $1', [article_id])
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
}