const db = require('../db/connection');

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

exports.selectArticles = async (sortBy = 'created_at', order = 'desc', topic) => {
  const validSortBy = ['title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
  const validOrder = ['asc', 'desc'];
  
  if(!validSortBy.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  };
  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  
  let queryStr = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM comments RIGHT JOIN articles ON articles.article_id = comments.article_id `;
  let injectArr = [];
  if(topic) {
    queryStr += `WHERE topic = $1 `;
    injectArr.push(topic);
  };
  queryStr += `GROUP BY articles.article_id ORDER BY ${sortBy} ${order};`;

  return db.query(queryStr, injectArr).then(({ rows: articles }) => {
    if(!articles.length) {
      return Promise.reject({
          status: 404,
          msg: 'Article not found'
      });
  };
    return articles
  });
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

exports.insertCommentByArticleId = (article_id, username, body) => {
  return db
  .query("INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *;", [body, article_id, username])
  .then(({rows: [comment]}) => {
    if(Object.keys(comment).length === 0) {
      return Promise.reject({
            status: 400,
            msg: 'Invalid input'
    });
  };
  return comment;
})}