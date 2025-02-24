const comments = [
  {
    id: 1,
    content: "test",
  },
  {
    id: 2,
    content: "test",
  },
  {
    id: 3,
    content: "test",
  },
  {
    id: 4,
    content: "test",
  },
];

const getAllComments = () => {
  return comments;
};

const getCommentById = (id) => {
  return comments.find((comment) => comment.id === id);
};

const createComment = (comment) => {
  comments.push(comment);
  return comment;
};

const updateComment = (data) => {
  const id = data.id;
  const comment = comments.find((comment) => comment.id === id);
  comment = { ...comment, ...data };
  return comment;
};

const deleteComment = (id) => {
  const index = comments.findIndex((comment) => comment.id === id);
  comments = comments.splice(index, 1);
  return id;
};

export default {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
