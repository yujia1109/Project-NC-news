const { removeCommentById } = require('../models/comment.models');

exports.deleteCommentById = (req, res, next) => {
    const { comment_id: id } = req.params;

    removeCommentById(id)
    .then((response) => {
        res.sendStatus(204)
    })
    .catch((err) => {
        next(err);
    });
};