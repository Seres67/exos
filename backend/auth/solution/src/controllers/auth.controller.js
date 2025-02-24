import authService from "../services/auth.service.js";

const register = async (req, res) => {
  const hash = await authService.register(req.body);
  console.log(hash);
  res.end();
};

const login = async (req, res) => {
  const token = await authService.login(req.body);
  if (token === "") {
    res.status(403).end();
  }
  res.status(200).json({ token });
};

export default { register, login };
