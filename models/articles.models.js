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

exports.selectArticles = async () => {
 
  const { rows: articles } = await db.query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM comments RIGHT JOIN articles ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at desc;');
      return articles;
  };

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query("SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body  FROM comments LEFT JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = $1;", [article_id])
    .then(({rows}) => {
      if(!rows.length) {
        return Promise.reject({
            status: 404,
            msg: 'Comments of this article not found'
        });
    }
    return rows;    
    });
};
