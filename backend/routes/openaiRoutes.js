import express from "express";
import { createChatCompletion } from "../controllers/openaiControllers.js";

const router = express.Router();

router.post("/", createChatCompletion);

export default router;
