import commentService from "../services/comment.service.js";

const getAllComments = (req, res) => {
  const comments = commentService.getAllComments();
  res.json(comments);
};

const getCommentById = (req, res) => {
  const comment = commentService.getCommentById(req.params.id);
  res.json(comment);
};

const createComment = (req, res) => {
  const comment = commentService.createComment({ content: req.body.content });
  res.json(comment);
};

const updateComment = (req, res) => {
  const comment = commentService.updateComment(req.body);
  res.json(comment);
};

const deleteComment = (req, res) => {
  const id = commentService.deleteComment(req.params.id);
  return id;
};

export default {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
