import express from "express";
import { createChat } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", createChat);

export default router;
