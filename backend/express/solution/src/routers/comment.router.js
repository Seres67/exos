import { Router } from "express";
import commentController from "../controllers/comment.controller.js";

const router = Router({ mergeParams: true });

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

router.post("/", commentController.createComment);

router.patch("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

export default router;
