const posts = [
  {
    id: 1,
    title: "test1",
    content: "test",
  },
  {
    id: 2,
    title: "test2",
    content: "test",
  },
  {
    id: 3,
    title: "test3",
    content: "test",
  },
  {
    id: 4,
    title: "test4",
    content: "test",
  },
];

const getAllPosts = () => {
  return posts;
};

const getPostById = (id) => {
  return posts.find((post) => post.id === id);
};

const createPost = (data) => {
  const post = { title: data.title, content: data.content };
  posts.push(post);
  return post;
};

const updatePost = (data) => {
  const id = data.id;
  const post = posts.find((post) => post.id === id);
  post = { ...post, ...data };
  return post;
};

const deletePost = (id) => {
  const index = posts.findIndex((post) => post.id === id);
  posts = posts.splice(index, 1);
  return id;
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
