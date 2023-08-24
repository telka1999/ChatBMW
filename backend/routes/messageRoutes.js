import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:chatId", getMessages);
router.post("/", createMessage);

export default router;
