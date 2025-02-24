import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const users = [];
  res.send(users);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = {};
  res.send(user);
});

export default router;
