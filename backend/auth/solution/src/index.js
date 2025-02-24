import express from "express";
import userRouter from "./routers/user.router.js";
import postRouter from "./routers/post.router.js";
import commentRouter from "./routers/comment.router.js";
import authRouter from "./routers/auth.router.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

postRouter.use("/:postId/comments", commentRouter);
userRouter.use("/:userId/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {});
