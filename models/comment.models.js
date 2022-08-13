const db = require('../db/connection');

exports.removeCommentById = (id) => {
    return db
    .query('DELETE FROM comments WHERE comment_id = $1', [id])
    .then((res) => {
        if(!res.rowCount) {
            return Promise.reject({
                status: 404,
                msg: 'Comment not found'
            });
        };       
    });
};
