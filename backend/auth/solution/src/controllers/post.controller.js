import postService from "../services/post.service.js";

const getAllPosts = (req, res) => {
  const posts = postService.getAllPosts();
  res.json(posts);
};

const getPostById = (req, res) => {
  const post = postService.getPostById(req.params.id);
  res.json(post);
};

const createPost = (req, res) => {
  const post = postService.createPost(req.body);
  res.json(post);
};

const updatePost = (req, res) => {
  const post = postService.updatePost(req.body);
  res.json(post);
};

const deletePost = (req, res) => {
  const id = postService.deletePost(req.params.id);
  res.json(id);
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
