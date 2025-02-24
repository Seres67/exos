import userService from "../services/user.service.js";

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

const getUserById = (req, res) => {
  const user = userService.getUserById(req.params.id);
  res.json(user);
};

const createUser = (req, res) => {
  const user = userService.createUser(req.body);
  res.json(user);
};

const updateUser = (req, res) => {
  const user = userService.updateUser(req.body);
  res.json(user);
};

const deleteUser = (req, res) => {
  const id = userService.deleteUser(req.params.id);
  res.json(id);
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
