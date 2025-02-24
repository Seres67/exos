const users = [
  {
    id: 1,
    username: "test1",
    password: "test",
  },
  {
    id: 2,
    username: "test2",
    password: "test",
  },
  {
    id: 3,
    username: "test3",
    password: "test",
  },
  {
    id: 4,
    username: "test4",
    password: "test",
  },
];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (data) => {
  const user = { username: data.username, password: data.password };
  users.push(user);
  return user;
};

const updateUser = (data) => {
  const id = data.id;
  const user = users.find((user) => user.id === id);
  user = { ...user, ...data };
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  users = users.splice(index, 1);
  return id;
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
