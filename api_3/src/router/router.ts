import { Router } from "express";
import authrouter from "./auth.router";
import chatRouter from "./chat.router";

const router = Router();

router.use('/auth', authrouter);
router.use('/chat', chatRouter);

export default router;