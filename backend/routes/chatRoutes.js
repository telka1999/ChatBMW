import express from "express";
import {
  createChat,
  getChats,
  deleteChat,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.get("/chat/:userId", getChats);
router.route("/chat").post(createChat).delete(deleteChat);

export default router;
