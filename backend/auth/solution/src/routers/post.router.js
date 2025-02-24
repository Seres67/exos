import { Router } from "express";
import postController from "../controllers/post.controller.js";

const router = Router({ mergeParams: true });

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.post("/", postController.createPost);

router.patch("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

export default router;
